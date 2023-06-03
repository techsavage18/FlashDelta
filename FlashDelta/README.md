# FlashDelta

FlashDelta introduces a revolutionary approach to stabilize blockchain DeFi protocols and liquidations by implementing a novel method called Flash Collaterals. This technique enables borrowing of funds, even in highly illiquid markets where such funds are non-existent. By utilizing cash settlements and creating a collateral based on asset deposits, FlashDelta optimizes liquidation efficiency while maintaining stability and resilience against sudden price fluctuations that could potentially render the protocol insolvent.

The Flash Collaterals method can be applied to various "cash settled" derivative protocols, including decentralized exchanges (DEX) for Contracts for Difference, cash-settled options, futures, and more.

## DEX

Contracts for Difference are cash settled instruments that allow users to trade without physically holding the underlying assets. In the case of FlashDelta, users can deposit collateral and engage in CFD trading, such as EUR/USD, with settlement in USDC. The purchase of a EUR/USD CFD does not involve the actual ownership of EUR or USD. Upon exiting a position, the difference between the entry and exit prices is used to calculate the profit or loss, which is then added or subtracted from the collateral available for withdrawal.

To participate in CFD trading, users must deposit sufficient collateral to meet the Entry Margin (typically 10%) and maintain collateralization above the Liquidation Margin (typically 5%) to avoid liquidation.

Liquidation of undecollateralized positions below the Liquidation Margin can be performed by any participant. The liquidator must possess enough collateral to take over the liquidated position and meet the required collateralization of the Entry Margin. Additionally, the liquidator receives a penalty from the liquidated position, typically equivalent to 2% of the market value at the time of liquidation.

## Flash Collaterals

In the event that a liquidator lacks the necessary collateral to assume a liquidated position, the liquidation transaction is reverted. However, through the concept of Flash Collaterals, the liquidator has the ability to borrow any desired amount of collateral, even if such funds do not exist, as long as they can be returned within the same blockchain transaction. During this borrowing period, the user is free to return to the CFD DEX and execute multiple liquidations, taking various bids and offers to offset positions resulting from the liquidations. If the user manages to generate profit through this process, they can then return the borrowed "flash collateral" and exit the transaction with their earnings.

## Implementation Details

The FlashDelta project is built on the Polygon zkEVM blockchain to leverage its scalability and efficiency. Solidity is used for contract development, and JavaScript/Next.js along with Chakra are employed for the frontend interface. Chainlink serves as the oracle for obtaining liquidation reference prices. Given that the DEX relies on Order Books, it is crucial to deploy it on the Polygon zkEVM blockchain to ensure low-cost transactions and optimal performance.