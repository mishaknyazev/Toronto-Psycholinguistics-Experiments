

var shuffleSequence = seq(/*"intro",*/ sepWith("sep", seq("story", rshuffle("s1", "s2"))), sepWith("sep", rshuffle("q1", "q2")));
var practiceItemTypes = ["practice"];


var defaults = [
    "Separator", {
        transfer: 1000, //wait for 1000ms
          //other options: "keypress", "click"
        normalMessage: "Please wait for the next sentence.", //message to be displayed
        errorMessage: "Wrong. Please wait for the next sentence." //message to be displayed in red
    },

    "Message", {
        //"html" option is obligatory
        hideProgressBar: false,
        transfer: "keypress"
    },

    "DashedSentence", {
        //"s" option is obligatory
        mode: "self-paced reading"
          //other option: "speeded acceptability"
    },

    "Question", {
        //"as" option is obligatory
        hasCorrect: true
    },

    "AcceptabilityJudgment", {
        //"s" option is obligatory
        //"q" option is obligatory
        //"as" option is obligatory
        as: ["1", "2", "3", "4", "5", "6", "7"],
        //writing the "as" option here means that this is the default for
        //all AcceptabilityJudgment items
        presentAsScale: true, //presents the "as" option as a scale
        instructions: "Use number keys or click boxes to answer.", //instruction text
        leftComment: "(Bad)", //displayed on the left side of the scale
        rightComment: "(Good)" //displayed on the right side of the scale
    },

    "DashedAcceptabilityJudgment", {
        //combination of AcceptabilityJudgment and DashedSentence
        //"s" option is obligatory
        //"q" option is obligatory
        //"as" option is obligatory
        hasCorrect: false
    },

    "Form", {
        //"html" option is obligatory
        hideProgressBar: true,
        continueOnReturn: true,
        saveReactionTime: true
    }
];

var items = [

    /*
    ===================
    SEPARATOR
    The pause needed between each item of the experiment
    ===================
    */

    //ends after timer (1000ms)
    ["sep", "Separator", {transfer: 1000, normalMessage: "Please wait for the next sentence."}],

    //ends when key is press
    ["sep", "Separator", {transfer: "keypress", normalMessage: "Please press any key to continue."}],


    /*
    ===================
    INTRODUCTION
    Can include files for Questionnaires, consent forms etc...
    ===================
    */

    //name of controller
    ["intro",
      //type
      "Form",
      //obligatory option that includes a HTML file that is a questionnaire
      {html: { include: "example_intro.html" },
      //fields that need to have the right format when taking input from user
      validators: {
        //age has to be a number
        age: function (s) { if (s.match(/^\d+$/)) return true; else return "Bad value for \u2018age\u2019"; }
        }
    } ],


    /*
    ===================
    TEXT
    Controllers that work with Text and Questions
    ===================
    */




    //text displayed word by word
    ["practice", "DashedSentence", {s: "This is a practice sentence before the experiment begins."}],

    //all text with MC question
    ["story", "Message", {html: "<center>This is a story you can see all at once!<br>
                                  Tanya and John were racing. She won.<b>Press any key to continue.</b></center>"},
                 "Question", {hasCorrect: false, randomOrder: false,
                              //if a question has a correct answer (hasCorrect: true), you would have to put
                              //that answer as the first element in the "as" option.
                              q: "How would you like to answer this question?",
                              as: ["Press 1 or click here for this answer.", //this would be the correct answer if hasCorrect:true
                                   "Press 2 or click here for this answer.",
                                   "Press 3 or click here for this answer."]}],


    //word by word text with fill in the blank question
    ["story", "DashedSentence", {s: "Remember the story?"},
     "Form", {html: 'Which player won the race: <input type="text" name="anything">'}],


     //all text with scaling question
     ["story", "Message", {html: "John and Tanya went for lunch after the race."},
                "AcceptabilityJudgment", {s:"From a scale of 1 to 9, how has your morning been?",
                                           as:["1","2","3","4","5","6","7","8","9"]}],



     // IMAGE + QUESTION
     ["story", "Message", {html:'<img src = "http://www.sjsu.edu/linguistics/pics/lld_wordle_660px.jpg" />', transfer: "keypress"},
              "Question", {q: "Whats under 'Language'?",
                            as: ["Knowledge", "Skill", "Math", "Research"]}],

     ["story", "Message", {html:'<img src = "http://www.sjsu.edu/linguistics/pics/lld_wordle_660px.jpg" /><br><p>WAIT</p>', transfer: 6000}],
     ["story", "Message", {html:'<img src = "http://www.sjsu.edu/linguistics/pics/lld_wordle_660px.jpg" /> <br><p>CLICK</p>', transfer: "click"}],


    //
    // Two "real" (i.e. non-filler) self-paced reading items with corresponding acceptability judgment items.
    // There are two conditions.
    //

    [["s1",1], "DashedSentence", {s: "The journalist interviewed an actress who he knew to be shy of publicity after meeting on a previous occasion."},
               "Question",       {q: "The actress was:", as: ["shy", "publicity-seeking", "impatient"]}],
    [["s2",1], "DashedSentence", {s: "The journalist interviewed an actress who after meeting on a previous occasion he knew to be shy of publicity."},
               "Question",       {q: "The actress was:", as: ["shy", "publicity-seeking", "impatient"]}],

    // The first question will be chosen if the first sentence from the previous two items is chosen;
    // the second question will be chosen if the second sentence from the previous pair of items is chosen.
    [["q1",[100,1]], "AcceptabilityJudgment", {s: "Which actress did the journalist interview after meeting her PA on a previous occasion?"}],
    [["q2",[100,1]], "AcceptabilityJudgment", {s: "Which actress did the journalist interview her husband after meeting on a previous occasion?"}],

    [["s1",2], "DashedSentence", {s: "The teacher helped struggling students who he encouraged to succeed without treating like idiots."},
               "Question",       {q: "What did the teacher do?",
                                  as: ["Encourage struggling students to succeed",
                                       "Encourage his best students to succeed",
                                       "Treat struffling students like idiots"]}],
    [["s2",2], "DashedSentence", {s: "The teacher helped struggling students who without treating like idiots he encouraged to succeed."},
               "Question",       {q: "What did the teacher do?", as: ["Encourage struggling students to succeed",
                                                                      "Encourage his best students to succeed",
                                                                      "Treat struggling students like idiots"]}],

    [["q1",[200,2]], "AcceptabilityJudgment", {s: {html: "<b>Which struggling students</b> did the teacher encourage to succeed without treating their friends like idiots?"}}],
    [["q2",[200,2]], "AcceptabilityJudgment", {s: {html: "<b>Which struggling students</b> did the teacher encourage their friends to succeed without treating like idiots?"}}],

    //
    // 10 self-paced-reading filler sentences.
    //

    ["f", "DashedSentence", {s: "The foreign spy that encoded the top-secret messages was given a new mission that required going to Japan."},
          "Question",       {q: "The spy's mission required him to:", as: ["Go to Japan", "Destroy top-secret messages", "Bug a hotel room"]}],

    ["f", "DashedSentence", {s: "The receptionist that the real estate company just hired immediately familiarized herself with all the phone numbers of their clients."},
          "Question",       {q: "The receptionist familiarized herself with:",
                             as: ["Some phone numbers",
                                  "The health and safety regulations",
                                  "Her boss"]}],

    ["f", "DashedSentence", {s: "Only two specialized surgeons that work in the hospital could do this operation."},
          "Question",       {q: "The operation can be performed by:",
                             as: ["Two surgeons with specialist training",
                                  "All the surgeons at the hospital",
                                  "Three surgeons who are currently off sick"]}],

    ["f", "DashedSentence", {s: "The gangsters that the local police officers tracked for years were represented by an inexperienced lawyer."},
          "Question",       {q: "Who did the inexperienced lawyer represent?",
                             as: ["Some gangsters", "Some local police officers", "A murder suspect"]}],

    ["f", "DashedSentence", {s: "The woman that John had seen in the subway bought herself a pair of stunning shoes that cost a fortune."},
          "Question",       {q: "Where did John see the woman?", as: ["In the subway", "On the bus", "In the shoe shop"]}],

    ["f", "DashedSentence", {s: "The cowboy that the bulls tried to trample injured himself getting off a horse."}],

    ["f", "DashedSentence", {s: "The patient that was admitted to the hospital last month still suffers severe pain in his left leg."},
          "Question",       {q: "Which of the following is true?",
                             as: ["The patient still has severe pain in his left leg",
                                  "The patient still has severe pain in his right leg",
                                  "The patient no longer suffers from pain in his left leg"]}]
];