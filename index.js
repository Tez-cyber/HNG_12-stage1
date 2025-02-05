const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// ============== MIDDLEWARES
const allowedOrigins = [`http://localhost:${PORT}`, "https://hng-12-stage1.onrender.com/"];
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
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
            <html>
            <head>
                <title>My Web Page</title>
            </head>
            <body>
                <form action="/api/classify-number" method="GET">
                    <label for="number">Enter a number:</label>
                    <input type="text" id="number" name="number">
                    <button type="submit">Submit</button>
                </form>
            </body>
            </html>
      `);
});
app.get("/api/classify-number", async (req, res) => {
    const numberQuery = req.query.number

    // == CHECK FOR NUMBER QUERY
    if (!numberQuery) {
        return res.status(400).json({ error: "Please provide a number" })
    }

    // == CHECK IF QUERY IS A NUMBER
    const checkNumber = parseInt(!numberQuery.match(/^-?[0-9]+$/) ? 
        "string" : numberQuery
    );
    if (isNaN(checkNumber)) {
        return res.status(400).json({
            "number": "alphabet",
            "error": true
        })
    }

    // ======= SUM OF NUMBERS PASSED
    const numArr = checkNumber.toString().split("")
    if (numArr.includes("-")) {
        numArr.splice(0, 1);
    }
    const sum = numArr.map(digit => parseInt(digit)).reduce((a, b) => a + b)
    const isArmstrong = (_) => {
        const numArrLength = numArr.length;
        const sum_armstrong = numArr.map(digit => Math.pow(parseInt(digit), numArrLength)).reduce((a, b) => a + b);

        return sum_armstrong === checkNumber;
    }

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

    // CHECH IF NUMBER IS A PERFECT
    const isPerfect = (num) => {
        if (num <= 1) return false;

        let sumOfDivisors = 0;

        for(let i = 1; i <= num / 2; i++) {
            if (num % i === 0) {
                sumOfDivisors += i;
            }
        }

        return sumOfDivisors === num;
    }

    // ========= CHECK IF NUMBER IS A PERFECT SQUARE
    const isPerfectSquare = (num) => {
        if (num < 0) return false;
        const sqrt = Math.sqrt(num);
        return Number.isInteger(sqrt);
    }

    // ========= GET FUN FACT
    const funFactCache = new Map();
    const CACHE_TTL = 60 * 60 * 1000;
    const getFunFact = async (num) => {
        // CHECK IF FUN FACT IS IN CACHE
        if (funFactCache.has(num)) {
            const cachedFact = funFactCache.get(num);
            if (cachedFact.expires > Date.now()) {
                return cachedFact.fact;
            }
        };

        try {
            const response = await fetch(`http://numbersapi.com/${num}/math`);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
            }

            const data = await response.text();
            const expires = Date.now() + CACHE_TTL;
            funFactCache.set(num, {
                fact: data,
                expires: expires
            });
            return data;
        } catch (error) {
            console.error("Error fetching fun fact:", error);
            return "Fun fact could not be retrieved.";
        }
    };

    // ===================
    const properties = [];
    const is_armstrong = isArmstrong(checkNumber);
    if (is_armstrong) {
        properties.push("armstrong");
    }
    if (checkNumber % 2 === 0) {
        properties.push("even");
    } else {
        properties.push("odd");
    }
    const is_perfect = isPerfect(checkNumber)
    const fun_fact = await getFunFact(checkNumber);
    setTimeout(async () => {
        const fact = await getFunFact(42);
        console.log(fact);
      }, 3600001);
    const is_prime = isPrime(checkNumber);

    return res.status(200).json({
        "number": numArr,
        "is_prime": is_prime,
        "is_perfect": is_perfect,
        "properties": properties,
        "digit_sum": sum,
        "fun_fact": fun_fact,
    })
})


// ============== START SERVER
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})