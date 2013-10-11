"""
TESTS is a dict with all you tests.
Keys for this will be categories' names.
Each test is dict with
    "input" -- input data for user function
    "answer" -- your right answer
    "explanation" -- not necessary key, it's using for additional info in animation.
"""

TESTS = {
    "Basics": [
        {
            "input": ["B--",
                      "---",
                      "--A"],
            "answer": 2.83,
            "explanation": [[0, 0, 0], [2, 2, 2.83]],
        },
        {
            "input": [
                "B-B",
                "BW-",
                "-BA"],
            "answer": 4,
            "explanation": [[0, 0, 0], [0, 2, 2], [2, 2, 4]]
        },
        {
            "input": [
                "BWB--B",
                "-W-WW-",
                "B-BWAB"],
            "answer": 12,
            "explanation": [[0, 0, 0], [2, 0, 2], [2, 2, 4], [0, 2, 6], [0, 5, 9], [2, 5, 11], [2, 4, 12]]
        },
        {
            "input": [
                "B---B-",
                "-WWW-B",
                "-WA--B",
                "-W-B--",
                "-WWW-B",
                "B-BWB-"],
            "answer": 9.24,
            "explanation": [[0, 0, 0], [0, 4, 4], [2, 5, 6.24], [2, 2, 9.24]]
        }
    ],
    "Extra": [
        {
            "input": [
                "BW-",
                "--A",
                "B--"
            ],
            "answer": 4.24,
            "explanation": [[0, 0, 0], [2, 0, 2], [1, 2, 4.24]]
        },
        {
            "input": [
                "B-B-B",
                "-WWW-",
                "BWA-B",
                "-WWW-",
                "B-B-B"],
            "answer": 8,
            "explanation": [[0, 0, 0], [0, 4, 4], [2, 4, 6], [2, 2, 8]]
        },
        {
            "input": [
                "BWA-B-",
                "-W----",
                "-WW-B-",
                "-W---B",
                "--B---",
                "B-B---"
            ],
            "answer": 12.89,
            "explanation": [[0, 0, 0], [5, 0, 5], [4, 2, 7.24], [2, 4, 10.07], [0, 2, 12.89]]
        },
        {
            "input": [
                "B-B--B-",
                "-W-W-W-",
                "--B---B",
                "BW-W-W-",
                "----A--",
                "BW-W-W-",
                "-B--B-B"],
            "answer": 9.24,
            "explanation": [[0, 0, 0], [0, 2, 2], [2, 2, 4], [2, 6, 8], [6, 6, 12], [6, 4, 14], [4, 4, 16]]
        },
        {
            "input": [
                "BBBBB",
                "BBBBB",
                "BBBBB",
                "BBBBB",
                "BBBBA"],
            "answer": 5.66,
            "explanation": [[0, 0, 0], [4, 4, 5.66]]
        },
        {
            "input": [
                "B-----",
                "-BBB--",
                "-WWBW-",
                "-----A",
                "B-W-B-"],
            "answer": 9.24,
            "explanation": [[0, 0, 0], [1, 3, 3.16], [2, 3, 4.16], [4, 4, 6.40], [3, 5, 7.81]]
        }
    ]
}
