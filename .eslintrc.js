module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    extends: 'google',
    "parserOptions": {
        "ecmaVersion": 2017,
        "sourceType": "module",
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    
    "rules": {
        "comma-dangle": ["error", "never"],
        'no-useless-escape': 0,
        'camelcase': 0,
        'no-mixed-spaces-and-tabs' : 0,
        "indent": [2, "tab"],
        "no-tabs": 0,
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};