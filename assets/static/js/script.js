// Function to display tabs
function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.style.display = 'none');
    document.getElementById(tabId).style.display = 'block';
}

// Investment Growth Calculator Logic
async function calculateInvestment() {
    const assetPrice = parseFloat(document.getElementById("assetPrice").value);
    const growthRate = parseFloat(document.getElementById("growthRate").value);
    const years = parseInt(document.getElementById("years").value);
    const currency = document.getElementById("currency").value;
    
    const futureValue = simulateGrowth(assetPrice, growthRate, years);
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `
        <p><strong>Investment Growth:</strong></p>
        <p>Initial Investment: ${assetPrice} ${currency}</p>
        <p>Growth Rate: ${growthRate}% annually</p>
        <p>Investment Value after ${years} years: ${futureValue[years].toFixed(2)} ${currency}</p>
    `;
}

// Simulation logic
function simulateGrowth(currentPrice, growthRate, years) {
    let values = [];
    for (let i = 0; i <= years; i++) {
        let futureValue = currentPrice * Math.pow(1 + growthRate / 100, i);
        values.push(futureValue);
    }
    return values;
}

// Monte Carlo Simulation
function runMonteCarlo() {
    const simulations = parseInt(document.getElementById("simulations").value);
    const assetPrice = parseFloat(document.getElementById("assetPriceMC").value);
    const growthRate = parseFloat(document.getElementById("growthRateMC").value);
    
    const allSimulations = [];
    for (let i = 0; i < simulations; i++) {
        const result = simulateGrowth(assetPrice, growthRate, 10); // simulate for 10 years
        allSimulations.push(result[10]);
    }
    
    const average = allSimulations.reduce((sum, val) => sum + val, 0) / allSimulations.length;
    const variance = allSimulations.reduce((sum, val) => sum + Math.pow(val - average, 2), 0) / allSimulations.length;
    const stdDev = Math.sqrt(variance);

    document.getElementById("mcResults").innerHTML = `
        <p><strong>Monte Carlo Simulation Results:</strong></p>
        <p>Average simulated future value: ${average.toFixed(2)}</p>
        <p>Standard deviation: ${stdDev.toFixed(2)}</p>
    `;
}

// Value at Risk (VaR)
function calculateVaR() {
    const portfolioValue = parseFloat(document.getElementById("portfolioValue").value);
    const confidenceLevel = parseFloat(document.getElementById("confidenceLevel").value) / 100;
    const volatility = parseFloat(document.getElementById("volatility").value) / 100;
    
    const zScore = normInv(1 - confidenceLevel);
    const VaR = portfolioValue * zScore * volatility;
    
    document.getElementById("VaRResults").innerHTML = `
        <p><strong>Value at Risk (VaR):</strong></p>
        <p>VaR at ${confidenceLevel * 100}% confidence: ${VaR.toFixed(2)}</p>
    `;
}

// Normal Inverse Function (Z-Score for VaR)
function normInv(p) {
    const a = [2.50662823884, -18.61500062529, 41.39119773534, -25.44106049637];
    const b = [-8.47351093090, 23.08336743743, -21.06224101826, 3.13082909833];
    const c = [-0.00000003852, 0.00000777479, 0.00000021211, -0.00000000016];
    
    let t = Math.sqrt(-2 * Math.log(1 - p));
    let x = t - ((a[0] + t * (a[1] + t * (a[2] + t * a[3])))) /
    (1 + t * (b[0] + t * (b[1] + t * (b[2] + t * b[3])))) + ((c[0] + t * (c[1] + t * (c[2] + t * c[3]))));

    return x;
}

// Probability of Hitting Target
function calculateHitProbability() {
    const targetPrice = parseFloat(document.getElementById("targetPrice").value);
    const currentPrice = parseFloat(document.getElementById("currentPrice").value);
    const daysToTarget = parseInt(document.getElementById("daysToTarget").value);
    
    // Placeholder logic: assume 20% chance of hitting target per day for simplicity
    const probability = 1 - Math.exp(-0.2 * daysToTarget);
    
    document.getElementById("hitProbabilityResults").innerHTML = `
        <p><strong>Probability of Hitting Target:</strong></p>
        <p>Probability of hitting target within ${daysToTarget} days: ${Math.min(probability * 100, 100).toFixed(2)}%</p>
    `;
}

// Portfolio Risk Analysis
function calculatePortfolioRisk() {
    const asset1Return = parseFloat(document.getElementById("asset1Return").value);
    const asset2Return = parseFloat(document.getElementById("asset2Return").value);
    const correlation = parseFloat(document.getElementById("correlation").value);
    
    // Assuming simple correlation-based risk calculation for two assets
    const portfolioRisk = Math.sqrt(Math.pow(asset1Return, 2) + Math.pow(asset2Return, 2) - 2 * correlation * asset1Return * asset2Return);
    
    document.getElementById("portfolioRiskResults").innerHTML = `
        <p><strong>Portfolio Risk:</strong></p>
        <p>Portfolio risk (standard deviation): ${portfolioRisk.toFixed(2)}</p>
    `;
}

// Probability of Drawdown
function calculateDrawdownProbability() {
    const maxDrawdown = parseFloat(document.getElementById("maxDrawdown").value);
    const historicalReturns = parseFloat(document.getElementById("historicalReturns").value);
    
    // Placeholder logic: assume 30% chance of exceeding max drawdown for simplicity
    const probability = 1 - Math.exp(-0.3 * maxDrawdown);
    
    document.getElementById("drawdownProbabilityResults").innerHTML = `
        <p><strong>Probability of Drawdown:</strong></p>
        <p>Probability of exceeding max drawdown of ${maxDrawdown}%: ${Math.min(probability * 100, 100).toFixed(2)}%</p>
    `;
}

// Bayesian Prediction Tool
function calculateBayesianPrediction() {
    const prior = parseFloat(document.getElementById("prior").value) / 100;
    const likelihood = parseFloat(document.getElementById("likelihood").value) / 100;
    
    const posterior = (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * (1 - likelihood)));
    
    document.getElementById("bayesianPredictionResults").innerHTML = `
        <p><strong>Bayesian Prediction:</strong></p>
        <p>Posterior probability: ${posterior.toFixed(2)}</p>
    `;
}

// Helper function: factorial
function factorial(n) {
    if (n === 0) return 1;
    return n * factorial(n - 1);
}
