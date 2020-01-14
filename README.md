This document describes the scripts' usage and its sequence.

# Requirements:
- [CURL](https://curl.haxx.se/) and [NodeJS](https://nodejs.org/en/) installed
- Currently only tested in Windows environments.
- Login credentials for `https://prs.prasarana.com.my/`, else you will need someone else to generate the files in `/output/Key-Value_Pair` for you. Or alternatively you can get a cookie.

# Preliminary Steps
1. If you did not download any data for `/output/Key-Value_Pair`, log in to `https://prs.prasarana.com.my/` and save the cookie entry with the key of `ci_session` into `/misc/private/cookies.txt`.
    > Sample entry:
    > ```
    > prs.prasarana.com.my	FALSE	/	FALSE	15<redacted>57	ci_session	  1v8root36<redacted>e5hvcvin4
    > ```
    Alternatively, you can download the [cookies.txt google chrome extension](https://chrome.google.com/webstore/detail/cookiestxt/njabckikapfpffapmjgojcnbfjonfjfg) to ease your work by exporting `cookies.txt` by point-and-click.
1. Run `Download_Key-Value_Pair.bat` in the directory with the `cookies.txt` file you just generated. The outputs will be placed in `/output/Key-Value_Pair`. In the future this will be changed into a node script.
    ```
    cd scripts
    ./Download_Key-Value_Pair.bat
    ```

# Getting KML Files
1. Do the preliminary steps.
1. Run `/scripts/getKML.js` to obtain the files. By default it will be saved in `/output/KMLs`
    ```
    node ./getKML.js
    ```

# Getting Bus Stop Locations and Information
1. Do the preliminary steps.
1. Replace the line in the `options` object within the `routeList.forEach` function within the `depotList.forEach` function with your obtained cookie string.
    Sample code:
    ```
    ...
    depotList.forEach(... => {
        ...
        routeList.forEach(... => {
            var option = {
                ...
                'headers': {
                    ...
                    'Cookie': "ci_session=<replace your coookie string here>",
                }
                ...
            }
            ...
        })
        ...
    })
    ...
    ```
1. Run `/scripts/getStopLocation.js` to obtain the files. By default it will be saved in `/output/StopList`.
    ```
    node ./getStopLocation.js
    ```

# Exporting the bus stops and KML files to static GTFS format
Work in progress. 

# Create middleware for live GTFS data

# Other portions of the guide
- [RAW API Access](./guides/API-Access.md)
- [URL Access to some pages](./guides/URL-Access.md)

# Error solving
- There are no permanenent error mitigation measures for disconnections yet, therefore if there are occurences of forced disconnections, get a fresh cookie and rerun the script.