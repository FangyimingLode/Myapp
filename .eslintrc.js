module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            "legacyDecorators": true,
            "experimentalObjectRestSpread": true,
            "modules": true
        },
    },
    "plugins": [
        "react",
    ],
    "parser": "babel-eslint",
    "rules": {
        "linebreak-style": [
            "error",
            "unix"
        ],
        "no-unused-vars": 'off',
        "no-console": "off",
        "comma-spacing": [2, { "before": false, "after": true }],
        "eqeqeq": [2, "allow-null"],
        "no-multiple-empty-lines": [1, {"max": 2}],
        "no-var": 0,

    },
};
