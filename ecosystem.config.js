module.exports = {
  apps : [{
    name: 'Api',
    script: './Api/entrypoint.sh',
    watch: './Api/',
    watch_delay: 1000,
    ignore_watch : ['./Api/node_modules'],
    watch_options: {
      'followSymlinks': false
    },
    env: {
      "NODE_ENV": "development",
    },
  }, {
    name: 'SitesChecker',
    script: './SitesChecker/build/main.js',
    watch: './SitesChecker/',
    watch_delay: 1000,
    ignore_watch : ['./SitesChecker/node_modules'],
    watch_options: {
      'followSymlinks': false
    },
    env: {
      "NODE_ENV": "development",
      "CHROME_BIN": "/usr/local/bin/chromium",
    }
  }, {
    name: 'Parser',
    script: './Parser/build/main.js',
    watch: './Parser/',
    watch_delay: 1000,
    ignore_watch : ['./Parser/node_modules'],
    watch_options: {
      'followSymlinks': false
    },
    env: {
      "NODE_ENV": "development",
      "CHROME_BIN": "/usr/local/bin/chromium",
    }
  }, {
    name: 'ConfigProvider',
    script: './ConfigProvider/build/main.js',
    watch: './ConfigProvider/',
    watch_delay: 1000,
    ignore_watch : ['./ConfigProvider/node_modules'],
    watch_options: {
      'followSymlinks': false
    },
    env: {
      "NODE_ENV": "development",
    }
  }],
};
