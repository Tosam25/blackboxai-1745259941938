// Blockchain API integration for BTCMINET
const BLOCKCYPHER_API_KEY = 'YOUR_API_KEY'; // Replace with actual key
const MIN_CONFIRMATIONS = 6;
const MIN_DEPOSIT = 0.000060; // 0.000060 BTC minimum deposit
const MIN_WITHDRAWAL = 0.00000040; // Minimum withdrawal amount
const GAS_FEE = 0.00000003; // Fixed network fee

// Get balance for a BTC address
async function getBalance(address) {
  try {
    const response = await fetch(`https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance`);
    const data = await response.json();
    return {
      balance: data.balance / 1e8, // Convert satoshis to BTC
      unconfirmed: data.unconfirmed_balance / 1e8
    };
  } catch (error) {
    console.error('Error fetching balance:', error);
    return { balance: 0, unconfirmed: 0 };
  }
}

// Get transactions for a BTC address
async function getTransactions(address) {
  try {
    const response = await fetch(`https://api.blockcypher.com/v1/btc/main/addrs/${address}/txs`);
    const data = await response.json();
    return data.txs || [];
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
}

// Validate BTC address format
function isValidBTCAddress(address) {
  return /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/.test(address);
}

// Format BTC amount
function formatBTC(amount) {
  return parseFloat(amount.toFixed(8));
}

// Check if transaction is confirmed
function isConfirmed(tx) {
  return tx.confirmations >= MIN_CONFIRMATIONS;
}

// Filter deposits only
function filterDeposits(txs, address) {
  return txs.filter(tx => {
    const outputs = tx.outputs || [];
    return outputs.some(output => 
      output.addresses && 
      output.addresses.includes(address) &&
      isConfirmed(tx)
    );
  });
}

// Filter withdrawals only
function filterWithdrawals(txs, address) {
  return txs.filter(tx => {
    const inputs = tx.inputs || [];
    return inputs.some(input => 
      input.addresses && 
      input.addresses.includes(address) &&
      isConfirmed(tx)
    );
  });
}

export {
  getBalance,
  getTransactions,
  isValidBTCAddress,
  formatBTC,
  filterDeposits,
  filterWithdrawals,
  MIN_DEPOSIT,
  MIN_WITHDRAWAL,
  GAS_FEE
};