import { User } from "../model/User.js";
import { Transaction } from "../model/Transactions.js";
import { validationResult } from "express-validator";
import Web3 from "web3";
const setWallet = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ message: 'Validation failed..!', error: errors.array() });
        }
        const { wallet_address } = req.body;
        let user = await User.create({ wallet_address });

        return res.status(201).json({ message: 'Wallet Address..!' })
    } catch (errors) {
        return res.status(501).json({ errors });
    }
}

const subscribeEvent = async (req, res) => {
    try {
        // const providerUrl = "https://endpoints.omniatech.io/v1/bsc/testnet/public";
        const providerUrl = 'wss://bsc-testnet.publicnode.com';

        const web3 = new Web3(new Web3.providers.WebsocketProvider(providerUrl));

        web3.currentProvider.on('connect', () => {
            console.log('Connected to WebSocket provider');
        });
        // console.log(web3.eth)
        const wallet_address = "0xfed53777fF73127aD82F79D2fD2AF18CD7c98a4f";
        const usdt_contract = "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd";
        const usdt_abi = '[{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"_decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]';

        // const contract = new web3.eth.Contract(usdt_abi, usdt_contract);
        // console.log(web3.utils.padLeft(web3.utils.toHex(wallet_address), 64));
        // Subscribe to logs
        const subscription = await web3.eth.subscribe('logs', {
            address: usdt_contract,
            topics: [
                web3.utils.sha3('Transfer(address,address,uint256)'),
                null,
                web3.utils.padLeft(web3.utils.toHex(wallet_address), 64),
            ],
        });
        // console.log('subskhsfkhsdhfksfh:', subscription)
        // Handle subscription events
        subscription.on('data', async (result) => {
            console.log({ result })
            const decodedData = web3.eth.abi.decodeLog([
                { type: 'address', name: 'from', indexed: true },
                { type: 'address', name: 'to', indexed: true },
                { type: 'uint256', name: 'value' },
            ], result.data, result.topics.slice(1));
            console.log('Decoded data:', decodedData);
            const { transactionHash } = result;
            const fromAddress = decodedData.from;
            const toAddress = decodedData.to;
            if (decodedData.to.toLowerCase() === wallet_address.toLowerCase()) {
                const value = web3.utils.fromWei(decodedData.value, 'ether');
                console.log('USDT received:', value);
                let t = await Transaction.create({ txn_hash: transactionHash, fromAddress, toAddress });
                console.log('txn stored successfully...!');
                // Store the event in the database or perform other actions
            }
        });


        subscription.on('error', (err) => {
            console.error('Subscription error:', err);
        });

    } catch (error) {
        console.log({ error })
    }
}
export { setWallet, subscribeEvent };