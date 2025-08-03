new Vue({
    el: '#app',
    data() {
        return {
            gameState: 'start', // 'start', 'playing', 'results'
            currentQuestionIndex: 0,
            selectedAnswer: null,
            correctAnswers: 0,
            showFeedback: false,
            timeLeft: 30,
            timer: null,
            
            // ==================================================
            // ESPACIO PARA AGREGAR PREGUNTAS
            // Agrega aquí tus preguntas siguiendo este formato:
            // {
            //   question: "Tu pregunta aquí",
            //   options: ["Opción A", "Opción B", "Opción C", "Opción D"],
            //   correct: 0 // Índice de la respuesta correcta (0-3)
            // }
            // ==================================================
            questions: [
                {
                    question: "¿Cuál es el lenguaje de programación más utilizado para desarrollo web frontend?",
                    options: ["Python", "JavaScript", "Java", "C++"],
                    correct: 1
                },
                {
                    question: "¿Qué significa HTML?",
                    options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
                    correct: 0
                },
                {
                    question: "¿Cuál de estos NO es un framework de JavaScript?",
                    options: ["React", "Angular", "Vue", "Django"],
                    correct: 3
                },
                {
                    question: "¿Qué propiedad CSS se usa para cambiar el color de fondo?",
                    options: ["color", "background-color", "bgcolor", "background"],
                    correct: 1
                },
                {
                    question: "¿Cuál es el puerto por defecto para HTTP?",
                    options: ["443", "21", "80", "25"],
                    correct: 2
                },
                {
                    question: "¿Qué significa CSS?",
                    options: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
                    correct: 2
                },
                {
                    question: "¿Cuál de estos es un preprocesador de CSS?",
                    options: ["SASS", "Node.js", "React", "MongoDB"],
                    correct: 0
                },
                {
                    question: "¿Qué método HTTP se usa para enviar datos al servidor?",
                    options: ["GET", "POST", "PUT", "DELETE"],
                    correct: 1
                },
                {
                    question: "¿Cuál es la extensión de archivo para JavaScript?",
                    options: [".java", ".js", ".javascript", ".jscript"],
                    correct: 1
                },
                {
                    question: "¿Qué significa DOM en desarrollo web?",
                    options: ["Document Object Model", "Data Object Management", "Dynamic Object Method", "Digital Output Module"],
                    correct: 0
                },
                {
                    question: "¿Cuál de estos es un sistema de control de versiones?",
                    options: ["Git", "NPM", "Webpack", "Babel"],
                    correct: 0
                },
                {
                    question: "¿Qué selector CSS selecciona elementos por su ID?",
                    options: [".", "#", "*", "&"],
                    correct: 1
                }
            ]
        }
    },
    computed: {
        totalQuestions() {
            return this.questions.length;
        },
        currentQuestion() {
            return this.questions[this.currentQuestionIndex];
        },
        progressPercentage() {
            return ((this.currentQuestionIndex + 1) / this.totalQuestions) * 100;
        },
        scorePercentage() {
            return Math.round((this.correctAnswers / this.totalQuestions) * 100);
        },
        feedbackMessage() {
            const percentage = this.scorePercentage;
            if (percentage >= 90) return "¡Excelente! Eres un experto 🌟";
            if (percentage >= 70) return "¡Muy bien! Buen conocimiento 👏";
            if (percentage >= 50) return "Bien, pero puedes mejorar 💪";
            return "Necesitas estudiar más 📚";
        },
        feedbackClass() {
            const percentage = this.scorePercentage;
            if (percentage >= 90) return "excellent";
            if (percentage >= 70) return "good";
            if (percentage >= 50) return "average";
            return "poor";
        }
    },
    methods: {
        startQuiz() {
            this.gameState = 'playing';
            this.shuffleQuestions();
            this.startTimer();
        },
        shuffleQuestions() {
            // Mezclar preguntas aleatoriamente
            for (let i = this.questions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
            }
        },
        selectAnswer(index) {
            if (!this.showFeedback) {
                this.selectedAnswer = index;
            }
        },
        submitAnswer() {
            if (this.selectedAnswer === null) return;
            
            this.showFeedback = true;
            this.stopTimer();
            
            if (this.selectedAnswer === this.currentQuestion.correct) {
                this.correctAnswers++;
            }
            
            setTimeout(() => {
                this.nextQuestion();
            }, 2000);
        },
        nextQuestion() {
            if (this.currentQuestionIndex < this.totalQuestions - 1) {
                this.currentQuestionIndex++;
                this.selectedAnswer = null;
                this.showFeedback = false;
                this.startTimer();
            } else {
                this.endQuiz();
            }
        },
        startTimer() {
            this.timeLeft = 30;
            this.timer = setInterval(() => {
                this.timeLeft--;
                if (this.timeLeft <= 0) {
                    this.timeUp();
                }
            }, 1000);
        },
        stopTimer() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        },
        timeUp() {
            this.stopTimer();
            this.showFeedback = true;
            setTimeout(() => {
                this.nextQuestion();
            }, 2000);
        },
        endQuiz() {
            this.gameState = 'results';
            this.stopTimer();
        },
        restartQuiz() {
            this.currentQuestionIndex = 0;
            this.selectedAnswer = null;
            this.correctAnswers = 0;
            this.showFeedback = false;
            this.startQuiz();
        },
        resetGame() {
            this.gameState = 'start';
            this.currentQuestionIndex = 0;
            this.selectedAnswer = null;
            this.correctAnswers = 0;
            this.showFeedback = false;
            this.stopTimer();
        }
    },
    beforeDestroy() {
        this.stopTimer();
    }
});