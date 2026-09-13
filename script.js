let currentQuestion = 1;
let score = 0;


/* =========================================
   SELECTED LEARNING INFORMATION
========================================= */

let selectedGrade = "";
let selectedSubject = "";
let selectedTopic = "";


/* =========================================
   PROGRESS STEPS
========================================= */

const progressMap = {

    "slide-welcome": "progress-level",
    "slide-grade": "progress-level",
    "slide-subject": "progress-subject",
    "slide-topic": "progress-topic",
    "slide-tutor": "progress-learn",
    "slide-lesson": "progress-learn",
    "slide-practice": "progress-practice",
    "slide-results": "progress-results"

};


/* =========================================
   SLIDE NAVIGATION
========================================= */

function goToSlide(slideId) {

    // Hide all slides
    document.querySelectorAll(".slide").forEach(function(slide) {

        slide.classList.remove("active");

    });


    // Show selected slide
    document.getElementById(slideId).classList.add("active");


    // Update progress
    updateProgress(slideId);


    // Scroll to top
    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================
   UPDATE PROGRESS
========================================= */

function updateProgress(slideId) {

    const progressSteps = [

        "progress-level",
        "progress-subject",
        "progress-topic",
        "progress-learn",
        "progress-practice",
        "progress-results"

    ];


    // Remove old states
    progressSteps.forEach(function(stepId) {

        document
            .getElementById(stepId)
            .classList.remove("active");

        document
            .getElementById(stepId)
            .classList.remove("completed");

    });


    const currentStep =
        progressMap[slideId];


    if (!currentStep) {
        return;
    }


    const currentElement =
        document.getElementById(currentStep);


    // Find current step position
    const currentIndex =
        progressSteps.indexOf(currentStep);


    // Mark previous steps completed
    progressSteps.forEach(function(stepId, index) {

        if (index < currentIndex) {

            document
                .getElementById(stepId)
                .classList.add("completed");

        }

    });


    // Mark current step active
    currentElement.classList.add("active");

}


/* =========================================
   GRADE SELECTION
========================================= */

function selectGrade(grade) {

    selectedGrade = grade;


    document.getElementById("selected-grade").textContent =
        "You selected " + grade;


    let subjectInstruction =
        document.getElementById("subject-instruction");


    let subjectButtons =
        document.getElementById("subject-buttons");


    subjectButtons.innerHTML = "";


    let subjects = [];


    /* FORM 1–4 */

    if (

        grade === "Form 1" ||
        grade === "Form 2" ||
        grade === "Form 3" ||
        grade === "Form 4"

    ) {

        subjects = [

            "Mathematics",
            "English",
            "Physics",
            "Chemistry",
            "Biology",
            "Civic Education"

        ];

    }


    /* GRADE 10–12 */

    if (

        grade === "Grade 10" ||
        grade === "Grade 11" ||
        grade === "Grade 12"

    ) {

        subjects = [

            "Mathematics",
            "English",
            "Science (Physics & Chemistry)",
            "Biology",
            "Civic Education"

        ];

    }


    subjectInstruction.textContent =
        "Choose a subject for " + grade + ":";


    subjects.forEach(function(subject) {

        let button =
            document.createElement("button");


        button.textContent = subject;


        button.onclick = function() {

            selectSubject(subject);

        };


        subjectButtons.appendChild(button);

    });


    goToSlide("slide-subject");

}


/* =========================================
   SUBJECT SELECTION
========================================= */

function selectSubject(subject) {

    selectedSubject = subject;


    document.getElementById("selected-subject").textContent =
        "You selected " + subject;


    let topicInstruction =
        document.getElementById("topic-instruction");


    let topicButtons =
        document.getElementById("topic-buttons");


    topicButtons.innerHTML = "";


    /* =====================================
       SCIENCE
    ===================================== */

    if (subject === "Science (Physics & Chemistry)") {


        topicInstruction.textContent =
            "Choose which area of Science you would like to study:";


        let physicsButton =
            document.createElement("button");


        physicsButton.textContent =
            "⚡ Physics";


        physicsButton.onclick = function() {

            selectScienceArea("Physics");

        };


        let chemistryButton =
            document.createElement("button");


        chemistryButton.textContent =
            "🧪 Chemistry";


        chemistryButton.onclick = function() {

            selectScienceArea("Chemistry");

        };


        topicButtons.appendChild(physicsButton);

        topicButtons.appendChild(chemistryButton);


        goToSlide("slide-topic");

        return;

    }


    /* =====================================
       SUBJECT TOPICS
    ===================================== */

    let topics = [];


    if (subject === "English") {

        topics = [

            "Parts of Speech",
            "Tenses",
            "Conditional Sentences",
            "Comprehension",
            "Composition",
            "Summary",
            "Sentence Transformation"

        ];

    }


    if (subject === "Mathematics") {

        topics = [

            "Numbers",
            "Algebra",
            "Geometry",
            "Statistics",
            "Probability",
            "Mensuration"

        ];

    }


    if (subject === "Physics") {

        topics = [

            "Measurement",
            "Forces",
            "Motion",
            "Energy",
            "Heat",
            "Electricity"

        ];

    }


    if (subject === "Chemistry") {

        topics = [

            "Matter",
            "Atomic Structure",
            "Elements and Compounds",
            "Chemical Reactions",
            "Acids and Bases",
            "The Periodic Table"

        ];

    }


    if (subject === "Biology") {

        topics = [

            "Cells",
            "Nutrition",
            "Respiration",
            "Transport",
            "Reproduction",
            "Ecology"

        ];

    }


    if (subject === "Civic Education") {

        topics = [

            "Human Rights",
            "Democracy",
            "Government",
            "Citizenship",
            "Constitution",
            "Good Governance"

        ];

    }


    topicInstruction.textContent =
        "Choose a topic in " + subject + ":";


    topics.forEach(function(topic) {

        let button =
            document.createElement("button");


        button.textContent = topic;


        button.onclick = function() {

            selectTopic(topic);

        };


        topicButtons.appendChild(button);

    });


    goToSlide("slide-topic");

}


/* =========================================
   SCIENCE AREA
========================================= */

function selectScienceArea(area) {

    selectedSubject = area;


    let topicInstruction =
        document.getElementById("topic-instruction");


    let topicButtons =
        document.getElementById("topic-buttons");


    topicButtons.innerHTML = "";


    let topics = [];


    if (area === "Physics") {

        topics = [

            "Measurement",
            "Forces",
            "Motion",
            "Energy",
            "Heat",
            "Electricity"

        ];

    }


    if (area === "Chemistry") {

        topics = [

            "Matter",
            "Atomic Structure",
            "Elements and Compounds",
            "Chemical Reactions",
            "Acids and Bases",
            "The Periodic Table"

        ];

    }


    topicInstruction.textContent =
        "Choose a topic in " + area + ":";


    topics.forEach(function(topic) {

        let button =
            document.createElement("button");


        button.textContent = topic;


        button.onclick = function() {

            selectTopic(topic);

        };


        topicButtons.appendChild(button);

    });

}


/* =========================================
   TOPIC SELECTION
========================================= */

function selectTopic(topic) {

    selectedTopic = topic;


    document.getElementById("selected-topic").textContent =
        "You selected " + topic;


    document.getElementById("lesson-welcome").textContent =
        "Let's begin your lesson on " +
        topic +
        " in " +
        selectedSubject +
        ".";


    goToSlide("slide-tutor");

}


/* =========================================
   START LESSON
========================================= */

async function startLesson() {

    document.getElementById("teacher-text").textContent =
        "Preparing your lesson...";

    document.getElementById("lesson-title").textContent =
        selectedTopic + " — " + selectedSubject;

    document.getElementById("lesson-welcome").textContent =
        "Your AI Tutor is preparing a step-by-step lesson for you.";

    document.getElementById("lesson-objectives").textContent =
        "Preparing your learning objectives...";

    document.getElementById("lesson-explanation").textContent =
        "Your AI Tutor is preparing the explanation...";

    document.getElementById("lesson-example").textContent =
        "Preparing a worked example...";

    document.getElementById("lesson-key-points").textContent =
        "Preparing the key points...";

    document.getElementById("lesson-practice").textContent =
        "Preparing your mini practice...";

    goToSlide("slide-lesson");


    const prompt =
        "You are KATEMA AI Tutor teaching a Zambian secondary school student. " +
        "The student is studying " + selectedGrade + ". " +
        "The subject is " + selectedSubject + ". " +
        "The topic is " + selectedTopic + ". " +

        "Create a clear, accurate, exam-focused lesson suitable for this level. " +
        "Do not assume the student already understands the topic. " +

        "Return the lesson ONLY as valid JSON. " +
        "Do not use markdown code fences. " +
        "Do not add any text before or after the JSON. " +

        "The JSON must have exactly these six fields: " +
        "objectives, explanation, example, keyPoints, practice, and introduction. " +

        "The objectives field should contain clear learning objectives. " +
        "The explanation field should teach the topic step by step in simple language. " +
        "The example field should contain at least one worked example with the steps clearly explained. " +
        "The keyPoints field should contain the most important facts the student should remember. " +
        "The practice field should contain short questions for the student to try. " +
        "The introduction field should briefly introduce the topic in a friendly way. " +

        "For Mathematics, Physics and Chemistry, use standard mathematical notation where appropriate. " +
        "Keep the lesson appropriate for the student's level.";


    const reply = await askAITutor(prompt);


    try {

        const lesson = JSON.parse(reply);

        document.getElementById("lesson-welcome").textContent =
            lesson.introduction || "Let's begin this lesson.";

        document.getElementById("lesson-objectives").textContent =
            lesson.objectives || "No objectives were provided.";

        document.getElementById("lesson-explanation").textContent =
            lesson.explanation || "No explanation was provided.";

        document.getElementById("lesson-example").textContent =
            lesson.example || "No example was provided.";

        document.getElementById("lesson-key-points").textContent =
            lesson.keyPoints || "No key points were provided.";

        document.getElementById("lesson-practice").textContent =
            lesson.practice || "No practice was provided.";

        document.getElementById("teacher-text").textContent =
            "Here is your lesson on " + selectedTopic + ".";
       
       if (window.MathJax) {
    MathJax.typesetPromise();
        }

    } catch (error) {

        console.error("Lesson formatting error:", error);

        document.getElementById("lesson-explanation").textContent =
            reply;

        document.getElementById("teacher-text").textContent =
            "Your lesson is ready.";

    }

}


/* =========================================
   CHECK ANSWER
========================================= */

function checkAnswer() {

    let answer =

        document.getElementById("student-answer")
        .value
        .toLowerCase()
        .trim();


    if (currentQuestion === 1) {

        if (answer === "she went to school every day.") {

            score++;

            document.getElementById("feedback").textContent =
                "Correct! 🎉";

        } else {

            document.getElementById("feedback").textContent =
                "Not quite. The correct answer is: She went to school every day.";

        }

    }


    if (currentQuestion === 2) {

        if (answer === "they played football yesterday.") {

            score++;

            document.getElementById("feedback").textContent =
                "Correct! 🎉";

        } else {

            document.getElementById("feedback").textContent =
                "Not quite. The correct answer is: They played football yesterday.";

        }

    }


    if (currentQuestion === 3) {

        if (answer === "i will visit my grandmother tomorrow.") {

            score++;

            document.getElementById("feedback").textContent =
                "Correct! 🎉";

        } else {

            document.getElementById("feedback").textContent =
                "Not quite. The correct answer is: I will visit my grandmother tomorrow.";

        }

    }


    document.getElementById("score-display").textContent =
        "Score: " + score;

}


/* =========================================
   NEXT QUESTION
========================================= */

function nextQuestion() {

    currentQuestion++;


    document.getElementById("student-answer").value = "";

    document.getElementById("feedback").textContent = "";


    if (currentQuestion === 2) {

        document.getElementById("question-number").textContent =
            "Question 2 of 3";


        document.getElementById("question-text").textContent =
            "Change this sentence into the past tense:";


        document.getElementById("question-sentence").textContent =
            "They play football yesterday.";

    }


    if (currentQuestion === 3) {

        document.getElementById("question-number").textContent =
            "Question 3 of 3";


        document.getElementById("question-text").textContent =
            "Change this sentence into the future tense:";


        document.getElementById("question-sentence").textContent =
            "I visit my grandmother tomorrow.";

    }


    if (currentQuestion > 3) {

        document.getElementById("final-score").textContent =
            "Your Score: " + score + " / 3";


        document.getElementById("final-topic").textContent =

            "You completed " +
            selectedTopic +
            " in " +
            selectedSubject +
            ".";


        goToSlide("slide-results");

    }

}
async function askAITutor(message) {
    try {
        const response = await fetch("/.netlify/functions/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "AI request failed");
        }

        return data.reply;

    } catch (error) {
        console.error("AI Tutor error:", error);
        return "AI ERROR: " + error.message;
    }
}
/* =========================================
   INTERACTIVE AI TUTOR
========================================= */

let tutorStep = 0;

async function nextTutorStep() {

    tutorStep++;

    document.getElementById("tutor-message").textContent =
        "🤖 Your AI Tutor is thinking...";

    document.getElementById("tutor-question").innerHTML =
        "<p>Please wait...</p>";

    document.getElementById("tutor-options").innerHTML = "";


    const prompt =
        "You are KATEMA AI Tutor teaching a " +
        selectedGrade +
        " student studying " +
        selectedSubject +
        ". The current topic is " +
        selectedTopic +
        ". " +

        "Create ONE interactive teaching moment. " +
        "Do not simply give the student the answer. " +
        "Ask a realistic hypothetical or thinking question " +
        "that makes the learner think about the topic. " +
        "Then provide exactly three possible answers. " +

        "Return ONLY valid JSON with exactly these fields: " +
        "message, question, options. " +

        "The message should briefly guide and encourage the learner. " +
        "The question should make the learner think. " +
        "The options should contain exactly three answer choices. ";


    const reply = await askAITutor(prompt);


    try {

        const tutor = JSON.parse(reply);


        document.getElementById("tutor-message").textContent =
            tutor.message;


        document.getElementById("tutor-question").innerHTML =
            "<p>🤔 " + tutor.question + "</p>";


        tutor.options.forEach(function(option) {

            const button = document.createElement("button");

            button.textContent = option;

            button.className = "tutor-option";

            document.getElementById("tutor-options")
                .appendChild(button);

        });


        document.getElementById("tutor-next").textContent =
            "Continue →";


    } catch (error) {

        console.error("Tutor formatting error:", error);

        document.getElementById("tutor-message").textContent =
            "I had trouble preparing the next question.";

        document.getElementById("tutor-question").innerHTML =
            "<p>Please try again.</p>";

    }

}
