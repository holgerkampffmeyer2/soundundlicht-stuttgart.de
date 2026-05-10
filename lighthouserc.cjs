module.exports = {
  ci: {
    collect: {
      numberOfRuns: 1,
      url: [
        'http://localhost:4321/'
      ],
      startServerCommand: 'pnpm run preview -- --port 4321',
      startServerReadyPattern: 'Server listening',
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.75 }],
        'categories:accessibility': ['warn', { minScore: 0.85 }],
        'categories:best-practices': ['warn', { minScore: 0.75 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
