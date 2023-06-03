// SPDX-License-Identifier: BUSL-1.1
import React from 'react';
import { VStack } from '@chakra-ui/react'
import Position from './Position'
import OrderEntry from './OrderEntry'
import OrderBook from './OrderBook'
import Liquidations from './Liquidations'
import MarketParams from './MarketParams'
import { BigNumber } from 'ethers'

function Body({provider, address, pair}) {
    const [myPos, setMyPos] = React.useState(null);
    const [sdenom, setSDenom] = React.useState(BigNumber.from(0));
    const [pdenom, setPDenom] = React.useState(BigNumber.from(0));
    const [oraclePrice, setOraclePrice] = React.useState(BigNumber.from(0));
    const [updateTrigger, setBlockNumber] = React.useState(null);

    const triggerUpdate = () => setBlockNumber(updateTrigger - 10)

    React.useEffect(() => {
        (async () => {
            if (!pair) return;
            setMyPos(await pair.contract.getMyPosition());
            setSDenom(await pair.contract.settlementCurrencyDenominator());
            setPDenom(await pair.contract.priceDenominator());
            setOraclePrice(await pair.contract.getPrice());
        }) ();
    }, [provider, address, pair]); // On load

    React.useEffect(() => {
        (async () => {
            if (!pair) return;
            setMyPos(await pair.contract.getMyPosition());
            setOraclePrice(await pair.contract.getPrice());
        }) ();
    }, [provider, address, pair, updateTrigger]); // On load

    const onUpdate = async (blockNumber) => {
console.log("Block ", blockNumber);
        setBlockNumber(blockNumber)
    }

    React.useEffect(() => {
        if (provider) {
            provider.on("block", onUpdate);
            return () => provider.off("block", onUpdate);
        }
    }); // Run on each render because onUpdate is a closure

    if (!pair || !address || !pair || !myPos || sdenom.isZero() || pdenom.isZero() || oraclePrice.isZero()) return(<></>);
    return (<VStack>
        <br/>
        <Position provider={provider} address={address} pair={pair} myPos={myPos} sdenom={sdenom} pdenom={pdenom} oraclePrice={oraclePrice} updateTrigger={updateTrigger} triggerUpdate={triggerUpdate}/>
        <OrderEntry provider={provider} address={address} pair={pair} myPos={myPos} sdenom={sdenom} pdenom={pdenom} oraclePrice={oraclePrice} updateTrigger={updateTrigger} triggerUpdate={triggerUpdate}/>
        <OrderBook provider={provider} address={address} pair={pair} myPos={myPos} sdenom={sdenom} pdenom={pdenom} oraclePrice={oraclePrice} updateTrigger={updateTrigger} triggerUpdate={triggerUpdate}/>
        <Liquidations provider={provider} address={address} pair={pair} myPos={myPos} sdenom={sdenom} pdenom={pdenom} oraclePrice={oraclePrice} updateTrigger={updateTrigger} triggerUpdate={triggerUpdate}/>
        <MarketParams provider={provider} address={address} pair={pair} myPos={myPos} sdenom={sdenom} pdenom={pdenom} oraclePrice={oraclePrice} updateTrigger={updateTrigger} triggerUpdate={triggerUpdate}/>
    </VStack>);
}

export default Body;