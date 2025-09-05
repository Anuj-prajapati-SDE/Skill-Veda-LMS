const natural = require("natural");
const faqData = require("./faqData");
const math = require("mathjs"); // Use mathjs instead of math-expression-evaluator

const tokenizer = new natural.WordTokenizer();
const { JaroWinklerDistance, LevenshteinDistance } = natural;
const TfIdf = natural.TfIdf;
const tfidf = new TfIdf();

// Add FAQ questions to the TF-IDF model
faqData.forEach(faq => {
    tfidf.addDocument(faq.question.toLowerCase());
});

// Function to calculate the best similarity score
const findBestMatch = (query) => {
    let bestMatch = null;
    let bestScore = 0;
    const queryTokens = tokenizer.tokenize(query.toLowerCase());

    faqData.forEach((faq, index) => {
        const questionTokens = tokenizer.tokenize(faq.question.toLowerCase());

        // Calculate Jaro-Winkler Similarity
        const jwScore = JaroWinklerDistance(query.toLowerCase(), faq.question.toLowerCase());

        // Calculate Levenshtein Distance Similarity
        const levScore = 1 - (LevenshteinDistance(query.toLowerCase(), faq.question.toLowerCase()) / Math.max(query.length, faq.question.length));

        // TF-IDF similarity
        let tfidfScore = 0;
        tfidf.tfidfs(queryTokens.join(' '), (i, measure) => {
            if (i === index) tfidfScore = measure;
        });

        // Weighted average for better accuracy
        const finalScore = (jwScore * 0.4) + (levScore * 0.4) + (tfidfScore * 0.2);

        if (finalScore > bestScore) {
            bestScore = finalScore;
            bestMatch = faq;
        }
    });

    return bestScore > 0.5 ? bestMatch : null;  // Ensure minimum confidence level
};

// Predefined responses for common queries
const predefinedResponses = {
    "hi": "Hello! How can I assist you today?",
    "who are you": "I am VedaBot, the SkillVeda Assistant, here to answer your questions!",
    "what can you do": "I can help you with course information, certifications, internship details, and more!",
    "tell me about yourself": "I am VedaBot, an AI-powered chatbot designed to assist users in navigating SkillVeda's offerings.",
    "what things are in SkillVeda": "SkillVeda offers courses, internships, training programs, certifications, and career guidance to help you upskill."
};

// Function to check if a query contains a mathematical expression
const containsMathExpression = (query) => {
    return /[0-9]+\s*[+\-*/^()]\s*[0-9]+/.test(query);
};

// Chatbot response function
exports.getAnswer = (req, res) => {
    const { query } = req.body;
    const lowerQuery = query.toLowerCase().trim();

    // If the query contains a mathematical expression anywhere, evaluate it
    if (containsMathExpression(lowerQuery)) {
        try {
            const extractedExpression = lowerQuery.match(/[0-9+\-*/().^% ]+/g).join("");
            const result = math.evaluate(extractedExpression);
            return res.json({ response: `The result of the expression is ${result}.` });
        } catch (error) {
            return res.json({ response: "I couldn't evaluate the expression. Please check the format." });
        }
    }

    // Check for predefined responses
    if (predefinedResponses[lowerQuery]) {
        return res.json({ response: predefinedResponses[lowerQuery] });
    }

    // Find best FAQ match
    const matchedFAQ = findBestMatch(lowerQuery);
    if (matchedFAQ) {
        return res.json({ response: matchedFAQ.answer });
    }

    // Default response when no match is found
    res.json({ response: "'Sorry !!!!!' I understand your question, but I couldn't find an exact answer. Try Something Different!" });
};

// controllers/issueController.js
const Issue = require('../models/helpSection.model');

exports.submitIssue = async (req, res) => {
    try {
        const { userId, issue } = req.body;

        // Validate input
        if (!userId || !issue) {
            return res.status(400).json({ message: 'User ID and issue description are required.' });
        }

        // Create a new issue
        const newIssue = new Issue({
            userId,
            issue
        });

        // Save the issue to the database
        await newIssue.save();

        res.status(201).json({ message: 'Issue submitted successfully.' });
    } catch (error) {
        console.error('Error submitting issue:', error);
        res.status(500).json({ message: 'An error occurred while submitting the issue.' });
    }
};
