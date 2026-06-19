(function () {
  'use strict';

  var DEBOUNCE_MS = 300;
  var MAX_RESULTS = 10;
  var SNIPPET_PAD = 30;

  var searchData = [];
  var overlay = null;
  var input = null;
  var selectedIndex = -1;
  var debounceTimer = null;

  function escapeHtml(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function extractSnippet(text, matchIdx, matchLen) {
    if (!text) return '';
    var start = Math.max(0, matchIdx - SNIPPET_PAD);
    var end = Math.min(text.length, matchIdx + matchLen + SNIPPET_PAD);
    var prefix = start > 0 ? '...' : '';
    var suffix = end < text.length ? '...' : '';
    var before = escapeHtml(text.substring(start, matchIdx));
    var matched = '<mark>' + escapeHtml(text.substring(matchIdx, matchIdx + matchLen)) + '</mark>';
    var after = escapeHtml(text.substring(matchIdx + matchLen, end));
    return prefix + before + matched + after + suffix;
  }

  function findBestMatch(item, query) {
    var q = query.toLowerCase();

    for (var fi = 0; fi < (item.features || []).length; fi++) {
      var feat = item.features[fi];
      var idx = feat.toLowerCase().indexOf(q);
      if (idx !== -1) {
        return { type: 'feature', snippet: extractSnippet(feat, idx, q.length), label: item.category };
      }
    }

    var titleIdx = item.title.toLowerCase().indexOf(q);
    if (titleIdx !== -1) {
      return { type: 'title', snippet: extractSnippet(item.title, titleIdx, q.length), label: item.category };
    }

    var desc = item.description || '';
    var descIdx = desc.toLowerCase().indexOf(q);
    if (descIdx !== -1) {
      return { type: 'description', snippet: extractSnippet(desc, descIdx, q.length), label: item.category };
    }

    return null;
  }

  function hideOverlay() {
    if (overlay) overlay.style.display = 'none';
    selectedIndex = -1;
  }

  function renderOverlay(results, query) {
    if (!overlay) return;
    overlay.innerHTML = '';

    if (results.length === 0) {
      overlay.innerHTML = '<div class="rental-search-empty">Keine Ergebnisse für "' + escapeHtml(query) + '"</div>';
      overlay.style.display = 'block';
      return;
    }

    var list = document.createElement('div');
    results.forEach(function (item, i) {
      var el = document.createElement('a');
      el.className = 'rental-search-item';
      var itemHref = item.detailPage || '#kontakt';
      el.href = itemHref;
      el.setAttribute('data-index', i);

      var catClass = 'rental-search-badge badge-' + item.category.toLowerCase();
      var snippetHtml = '';
      if (item.match.type !== 'title') {
        snippetHtml = '<div class="rental-search-snippet">' + item.match.snippet + '</div>';
      } else {
        snippetHtml = '<div class="rental-search-snippet">' + item.match.snippet + '</div>';
      }

      el.innerHTML =
        '<img src="' + escapeHtml(item.image) + '" alt="" loading="lazy" width="48" height="48">' +
        '<div class="rental-search-item-text">' +
          '<div class="rental-search-item-title">' + escapeHtml(item.title) + '</div>' +
          '<div class="rental-search-meta">' +
            '<span class="' + catClass + '">' + escapeHtml(item.category) + '</span>' +
            '<span class="rental-search-price">' + escapeHtml(item.price) + '</span>' +
          '</div>' +
          snippetHtml +
        '</div>';

      el.addEventListener('mousedown', function (e) {
        e.preventDefault();
        window.location.href = itemHref;
      });

      list.appendChild(el);
    });

    overlay.appendChild(list);
    overlay.style.display = 'block';
    selectedIndex = -1;
  }

  function showResults(query) {
    var q = query.toLowerCase();
    var results = [];

    for (var si = 0; si < searchData.length; si++) {
      if (results.length >= MAX_RESULTS) break;
      var item = searchData[si];
      var match = findBestMatch(item, q);
      if (match) {
        results.push({
          slug: item.slug,
          title: item.title,
          image: item.image,
          description: item.description,
          category: item.category,
          price: item.price,
          features: item.features,
          detailPage: item.detailPage,
          match: match
        });
      }
    }

    renderOverlay(results, query);
  }

  function onInput() {
    clearTimeout(debounceTimer);
    var val = input.value.trim();
    if (val.length < 2) {
      hideOverlay();
      return;
    }
    debounceTimer = setTimeout(function () {
      showResults(val);
    }, DEBOUNCE_MS);
  }

  function onKeydown(e) {
    var items = overlay ? overlay.querySelectorAll('.rental-search-item') : [];
    if (e.key === 'Escape') {
      hideOverlay();
      input.blur();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
      updateSelection(items);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = Math.max(selectedIndex - 1, 0);
      updateSelection(items);
      return;
    }
    if (e.key === 'Enter' && selectedIndex >= 0 && items[selectedIndex]) {
      e.preventDefault();
      window.location.href = items[selectedIndex].href;
      return;
    }
  }

  function updateSelection(items) {
    items.forEach(function (el, i) {
      el.classList.toggle('rental-search-item-active', i === selectedIndex);
    });
    if (items[selectedIndex]) {
      items[selectedIndex].scrollIntoView({ block: 'nearest' });
    }
  }

  function onDocumentClick(e) {
    if (overlay && overlay.style.display !== 'none') {
      if (!input.contains(e.target) && !overlay.contains(e.target)) {
        hideOverlay();
      }
    }
  }

  function onFocus() {
    var val = input.value.trim();
    if (val.length >= 2) {
      showResults(val);
    }
  }

  function init() {
    var script = document.getElementById('rentalSearchData');
    input = document.querySelector('[data-rental-search]');
    if (!script || !input) return;

    try {
      searchData = JSON.parse(script.textContent);
    } catch (e) {
      return;
    }

    overlay = document.createElement('div');
    overlay.className = 'rental-search-overlay';
    overlay.style.display = 'none';
    var wrapper = input.parentElement;
    wrapper.style.position = 'relative';
    wrapper.appendChild(overlay);

    input.addEventListener('input', onInput);
    input.addEventListener('keydown', onKeydown);
    input.addEventListener('focus', onFocus);
    document.addEventListener('click', onDocumentClick);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
