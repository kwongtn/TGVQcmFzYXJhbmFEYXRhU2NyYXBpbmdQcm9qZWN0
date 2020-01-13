FOR /L %%A IN (1,1,24) DO (
    curl --cookie ../misc/private/cookies.txt "https://prs.prasarana.com.my/atten_ot/get_route/%%A" > "../output/Key-Value_Pair/%%A.json"
    ECHO %%A
)