/*
    I had to rethink the idea to serve the questionsData as a JSON-file.
    The reason is that I the assignment does not involve a server (for example live-server or an actual server).
    Therefore the fetch-method is not possible to use to read a file localy because of limitation of the browsers. (For security reasons).
    
    The only feasible solution that I know of today, were to create a javascript-file and add the content as an object.
*/

/**
 * I just realised... I could use JSON-file, and serve it like I do with this file.
 * <script src="questionsJSON.json"></script>
 * And then access that file with:
 * let questions = JSON.parse(questionsJSON);
 * 
 * Though, I belive I will go with the solution I already got, besauce it's possible to comment in a .js file, while JSON file it aint possible to comment in
 */

let questionsData = {
        "categories": {
            "bräd och kortspel": [
                {
                    "question": "I vilket spel är det man tävlar om pengar?",
                    "wrongAlternatives":["Hängagubbe","Uno"],
                    "correctAnswer": "Monopol"
                },
                {
                    "question": "Vad heter spelet där du letar efter en diamant?",
                    "wrongAlternatives": ["kalaha","Tjuv och polis"],
                    "correctAnswer": "Diamanten"
                }
    
            ],
    
            "djur": [
                {
                "question": "Vilket djur kan du inte se i Sverige i vildmarken?",
                "wrongAlternatives": ["Älg", "Räv"],
                "correctAnswer": "Skunk"
                }
            ],
    
            "disney": [
                {
                    "question": "Vad heter disney princessan som inte får åka ut på havet för sin pappa?",
                    "wrongAlternatives": ["Snövit", "Belle"],
                    "correctAnswer": "Vaiana"
                },
    
                {
                    "question": "Vad heter filmen där princessorna Anna och Elsa finns?",
                    "wrongAlternatives":["Skönheten och odjuret","Lilo & Stitch"],
                    "correctAnswer": "Frost"
                },
                {
                    "question": "I filmen Insidan Ut (2015) finns det fem karaktärer som är baserad på känslor. Vad heter karaktären som alltid är glad?",
                    "wrongAlternatives":["Rädsla","Ilska"],
                    "correctAnswer": "Glädje"
                },
    
                {
                    "question": "Vad heter prinsen i filmen Lejonkungen som sedan blir kung?",
                    "wrongAlternatives":["Mufasa","Timon"],
                    "correctAnswer": "Simba"
                }
    
            ],
    
            "tv-spel": [
                {
                    "question": "Vad heter spelet där du försöker fånga monster och levela upp dem för att få dem starkare? (Bara namnet behövs)",
                    "wrongAlternatives":["Digimon","Beyblade"],
                    "correctAnswer": "Pokemon"
                }
            ],
    
            "tv-serie": [
                {
                    "question": "Vad heter tv-serien där det är en gul disksvamp är huvudkaraktär?",
                    "wrongAlternatives":["Byggare Bob","My little pony"],
                    "correctAnswer": "Svampbob Fyrkant"
                },
                {
                    "question": "I serien My little pony, finns en pony som heter Twilight Sparkle. Vilken färg är Sparkle?",
                    "wrongAlternatives" : ["Rosa","Blå"],
                    "correctAnswer": "Lila"
                }
    
            ]
        }
    };
