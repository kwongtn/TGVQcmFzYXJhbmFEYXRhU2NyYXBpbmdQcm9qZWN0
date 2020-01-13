This document describes the scripts' usage and its sequence.

# Requirements:
- [CURL](https://curl.haxx.se/) and [NodeJS](https://nodejs.org/en/) installed
- Currently only tested in Windows environments.
- Login credentials for `https://prs.prasarana.com.my/`, else you will need someone else to generate the files in `/Key-Value_Pair` for you.

# Getting KML Files
1. (If there is no data in `/Key-Value_Pair`) Log in to `https://prs.prasarana.com.my/` and save the cookie entry with the key of `ci_session` into `/misc/private/cookies.txt`.  
    > Sample entry:
    > ```
    > prs.prasarana.com.my	FALSE	/	FALSE	15<redacted>57	ci_session	  1v8root36<redacted>e5hvcvin4
    > ```
    Or, you can download the [cookies.txt google chrome extension](https://chrome.google.com/webstore/detail/cookiestxt/njabckikapfpffapmjgojcnbfjonfjfg) to ease your work.

1. Run `Key-Value_Pair.bat` in the directory with the `cookies.txt` file you just generated. The outputs will be placed in `/output/Key-Value_Pair`.

1. Run `/scripts/getKML.js` to obtain the files.
    ```
    cd scripts
    node ./getKML.js
    ```

# Other portions of the guide
- [RAW API Access](./guides/API-Access.md)
- [URL Access to some pages](./guides/URL-Access.md)