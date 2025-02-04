const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// ============== MIDDLEWARES
const allowedOrigins = [`http://localhost:${PORT}`];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) === -1) {
            return callback(null, true);
        }
        const msg = 'Go baack!!!!! Origin not allowed by CORS';
        return callback(new Error(msg), false);

    }
}));

// ============== ROUTE
app.get("/api/classify-number", (req, res) => {
    const numberQuery = req.query.number

    // == CHECK FOR NUMBER QUERY
    if (!numberQuery) {
        return res.status(400).json({ error: "Please provide a number" })
    }

    // == CHECK IF QUERY IS A NUMBER
    const checkNumber = parseInt(numberQuery);

    if (isNaN(checkNumber)) {
        return res.status(400).json({
            "number": "alphabet",
            "error": true
        })
    }

    // ======= SUM OF NUMBERS PASSED
    const numArr = checkNumber.toString().split("")
    const sum = numArr.map(digit => parseInt(digit)).reduce((a, b) => a + b)

    // ===== CHECK IF NUMBER IS PRIME
    function isPrime(checkNumber) { 
        if (checkNumber < 2) {
            return false;
        }

        for (let i = 2; i * i <= checkNumber; i++) { // Optimized loop
            if (checkNumber % i === 0) {
                return false;
            }
        }

        return true;
    }

    const is_prime = isPrime(checkNumber);  // Call the isPrime function

    // ========= CHECK IF NUMBER IS A PERFECT SQUARE
    const isPerfectSquare = (num) => {
        if(num < 0) return false;
        const sqrt = Math.sqrt(num);
        return Number.isInteger(sqrt);
    }
    const is_perfect = isPerfectSquare(checkNumber)

    return res.status(200).json({
        "number": checkNumber,
        "is_prime": is_prime,
        "is_perfect": is_perfect,
        "properties": "",
        "digit_sum": sum
    })
})


// ============== START SERVER
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})