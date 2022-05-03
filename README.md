# Test results

Results of Pryv.io test suites.

Results files are generated by Mocha's JSON reporter, and organized into the following file structure:

```
.
├── <service name>/
│   ├── <version number>/
│   │   ├── YYYYMMDD-HHmmss-<service>.json
│   │   ├── ...
│   │   └── latest # symlink to latest JSON results file
│   ├── ...
│   └── latest # symlink to latest version folder
└── ...
```

All directories in this repo are assumed to contain service test results.

For more details, see the following repositories:
- [service-core](https://github.com/pryv/service-core) for how the data is generated
- [dev-site](https://github.com/pryv/dev-site) for how the data is parsed and rendered on api.pryv.com
