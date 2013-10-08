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
                      "--L"],
            "answer": 2.83,
            "explanation": "3+2=?"
        },
        {
            "input": [
                "B-B",
                "BW-",
                "-BL"],
            "answer": 4,
            "explanation": "5+7=?"
        },
        {
            "input": [
                "BWB--B",
                "-W-WW-",
                "B-BWLB"],
            "answer": 12,
            "explanation": "5+7=?"
        },
        {
            "input": [
                "B---B-",
                "-WWW-B",
                "-WL--B",
                "-W-B--",
                "-WWW-B",
                "B-BWB-"],
            "answer": 9.24,
            "explanation": "5+7=?"
        }
    ]
}
