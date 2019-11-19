## GDC Token (rbg-clone)

1. Deploy Minime Token contract without factory 

2. Modified `.env` file for clone Token 
    ```bash
    PRIVKEY="1234567890abcd..."
    INFURAKEY="1234567890abcd..."
    PARENT="0x1a1a2dd27caefa9efb540ba610df1afa0e49fad0" # deployed Minime Token address
    MULTIPLY=1
    SNAPSHOT=50
    ```
    - `PRIVKEY` without 0x prefix only private key
    - `INFURAKEY` what if you are using infura node just add project key
    - `PARENT` is the address of parent token of clone minime token. 
    - `MULTIPLY` is params for scale number of a balance of parent token
    - `SNAPSHOT` is target block number of parents token
    
3. Run `npm run migrate:clone` for deploy clone token.
