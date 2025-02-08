module.exports = {
  default: {
    paths: [
      'tests/features/**/*.{feature,feature.md}'
    ],
    require: [
      'tests/steps/**/*.ts'
    ],
    requireModule: [
      'ts-node/register'
    ],
    format: ['progress', ['html', 'cucumber-report.html']],
    timeout: 60000,
  },
};