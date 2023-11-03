
export async function bscChain() {
    const {ethereum} = (window) as any;
    try {
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x38' }],
        });
    } catch (switchError:any) {
        if (switchError.code === 4902) {
            try {
                await ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: '0x38',
                        chainName: 'Binance Smart Chain',
                        nativeCurrency: {
                            name: 'BNB',
                            symbol: 'BNB',
                            decimals: 18,
                        },
                        rpcUrls: ['https://bsc-dataseed2.defibit.io'],
                        blockExplorerUrls: ['https://bscscan.com/'],
                    }]
                })
            } catch (addError) {
                console.log('Error adding Chain');
            }
        }
    }
}

export async function polyChain() {
    const {ethereum} = (window) as any;
    try {
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x89' }],
        });
    } catch (switchError:any) {
        if (switchError.code === 4902) {
            try {
                await ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: '0x89',
                        chainName: 'Polygon',
                        nativeCurrency: {
                            name: 'MATIC',
                            symbol: 'MATIC',
                            decimals: 18,
                        },
                        rpcUrls: ['https://matic-mainnet.chainstacklabs.com'],
                        blockExplorerUrls: ['https://polygonscan.com/'],
                    }]
                })
            } catch (addError) {
                console.log('Error adding Chain');
            }
        }
    }
}

export async function ethChain() {
    const {ethereum} = (window) as any;
    try {
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x1' }],
        });
    } catch (switchError:any) {
        console.log('Wallet Not Connected')
    }
}

export async function hardChain() {
    const {ethereum} = (window) as any;
    try {
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x7A69' }],
        });
    } catch (switchError:any) {
        if (switchError.code === 4902) {
            try {
                await ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: '0x7A69',
                        chainName: 'HardHat',
                        nativeCurrency: {
                            name: 'ETH',
                            symbol: 'ETH',
                            decimals: 18,
                        },
                        rpcUrls: ['http://node.a3b.io:8545'],
                        blockExplorerUrls: [''],
                    }]
                })
            } catch (addError) {
                console.log('Error adding Chain');
            }
        }
    }
}
export async function hardChainb() {
    const {ethereum} = (window) as any;
    try {
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x7A69' }],
        });
    } catch (switchError:any) {
        if (switchError.code === 4902) {
            try {
                await ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: '0x7A69',
                        chainName: 'HardHat',
                        nativeCurrency: {
                            name: 'N2D',
                            symbol: 'N2D',
                            decimals: 18,
                        },
                        rpcUrls: ['http://node.a3b.io:8546'],
                        blockExplorerUrls: [''],
                    }]
                })
            } catch (addError) {
                console.log('Error adding Chain');
            }
        }
    }
}

export async function bscTest() {
    const {ethereum} = (window) as any;
    try {
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x61' }],
        });
    } catch (switchError:any) {
        if (switchError.code === 4902) {
            try {
                await ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: '0x61',
                        chainName: 'BSC Testnet',
                        nativeCurrency: {
                            name: 'tBNB',
                            symbol: 'tBNB',
                            decimals: 18,
                        },
                        rpcUrls: ['https://data-seed-prebsc-1-s3.binance.org:8545'],
                        blockExplorerUrls: ['https://testnet.bscscan.com/'],
                    }]
                })
            } catch (addError) {
                console.log('Error adding Chain');
            }
        }
    }
}

export async function ethTest() {
    const {ethereum} = (window) as any;
    try {
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x5' }],
        });
    } catch (switchError:any) {
        console.log('Wallet Not Connected')
    }
}

export async function polyTest() {
    const {ethereum} = (window) as any;
    try {
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x13881' }],
        });
    } catch (switchError:any) {
        if (switchError.code === 4902) {
            try {
                await ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: '0x13881',
                        chainName: 'Polygon Mumbai',
                        nativeCurrency: {
                            name: 'MATIC',
                            symbol: 'MATIC',
                            decimals: 18,
                        },
                        rpcUrls: ['https://matic-mumbai.chainstacklabs.com'],
                        blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
                    }]
                })
            } catch (addError) {
                console.log('Error adding Chain');
            }
        }
    }
}