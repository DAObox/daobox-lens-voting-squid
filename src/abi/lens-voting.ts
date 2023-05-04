import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './lens-voting.abi'

export const abi = new ethers.utils.Interface(ABI_JSON);

export const events = {
    FollowNFTDelegatedPowerChanged: new LogEvent<([delegate: string, newPower: ethers.BigNumber, timestamp: ethers.BigNumber] & {delegate: string, newPower: ethers.BigNumber, timestamp: ethers.BigNumber})>(
        abi, '0xd9a6070174f4ccca76ed4896432e9a090b16e07e8fe27f275f50b33500b98e52'
    ),
    FollowNFTTransferred: new LogEvent<([profileId: ethers.BigNumber, followNFTId: ethers.BigNumber, from: string, to: string, timestamp: ethers.BigNumber] & {profileId: ethers.BigNumber, followNFTId: ethers.BigNumber, from: string, to: string, timestamp: ethers.BigNumber})>(
        abi, '0x4996ad2257e7db44908136c43128cc10ca988096f67dc6bb0bcee11d151368fb'
    ),
}

export const functions = {
    delegate: new Func<[delegatee: string], {delegatee: string}, []>(
        abi, '0x5c19a95c'
    ),
    getDelegatedSupplyByBlockNumber: new Func<[blockNumber: ethers.BigNumber], {blockNumber: ethers.BigNumber}, ethers.BigNumber>(
        abi, '0x8fca0d41'
    ),
    getPowerByBlockNumber: new Func<[user: string, blockNumber: ethers.BigNumber], {user: string, blockNumber: ethers.BigNumber}, ethers.BigNumber>(
        abi, '0x2c994dc8'
    ),
    initialize: new Func<[profileId: ethers.BigNumber], {profileId: ethers.BigNumber}, []>(
        abi, '0xfe4b84df'
    ),
    mint: new Func<[to: string], {to: string}, ethers.BigNumber>(
        abi, '0x6a627842'
    ),
}

export class Contract extends ContractBase {

    getDelegatedSupplyByBlockNumber(blockNumber: ethers.BigNumber): Promise<ethers.BigNumber> {
        return this.eth_call(functions.getDelegatedSupplyByBlockNumber, [blockNumber])
    }

    getPowerByBlockNumber(user: string, blockNumber: ethers.BigNumber): Promise<ethers.BigNumber> {
        return this.eth_call(functions.getPowerByBlockNumber, [user, blockNumber])
    }
}
