export const defaultQuestions = [
  {
    question:
      "A train is moving at a speed of 60 km/h. It passes a pole in 30 seconds. What is the length of the train?",
    options: [
      {
        text: "300 meters",
        points: 0,
        explanation: "Incorrect. You may have miscalculated the speed or time.",
      },
      {
        text: "600 meters",
        points: 3,
        explanation:
          "Partially correct. This is close but not accurate. Double-check the conversion.",
      },
      {
        text: "400 meters",
        points: 0,
        explanation: "Incorrect. This does not match the correct calculation.",
      },
      {
        text: "500 meters",
        points: 10,
        explanation:
          "Correct! Convert speed to meters per second (60 km/h = 16.67 m/s). Multiply by time (16.67 × 30 = 500 meters).",
      },
    ],
  },
  {
    question:
      "Which of the following is a common challenge in microservices architecture?",
    options: [
      {
        text: "Integrating all services into a single codebase.",
        points: 0,
        explanation:
          "Incorrect. Microservices are designed to avoid a single codebase by separating functionality.",
      },
      {
        text: "Managing inter-service communication and data consistency.",
        points: 10,
        explanation:
          "Correct! Inter-service communication and maintaining data consistency are significant challenges in microservices.",
      },

      {
        text: "Ensuring that all services use the same programming language.",
        points: 3,
        explanation:
          "Partially correct. While using the same language can simplify development, it's not required for microservices.",
      },
      {
        text: "Minimizing the use of databases across services.",
        points: 0,
        explanation:
          "Incorrect. Microservices often use multiple databases tailored to each service's needs.",
      },
    ],
  },
  {
    question:
      "How does Liven One enable businesses to improve customer engagement?",
    options: [
      {
        text: "By offering advanced analytics tools that connect loyalty, POS, and CRM data.",
        points: 10,
        explanation:
          "Correct! These tools enable targeted campaigns and personalized customer experiences.",
      },
      {
        text: "By simplifying customer interaction to minimize data collection.",
        points: 0,
        explanation:
          "Incorrect. Liven One enhances engagement by leveraging customer data effectively.",
      },
      {
        text: "By automating feedback collection for general marketing campaigns.",
        points: 3,
        explanation:
          "Partially correct. While feedback is important, Liven One focuses more on targeted and integrated campaigns.",
      },
      {
        text: "By limiting customer loyalty programs to high-value users.",
        points: 0,
        explanation:
          "Incorrect. Liven One aims to engage a broader customer base.",
      },
    ],
  },
  {
    question: "Where did the croissant originate?",
    options: [
      {
        text: "Austria",
        points: 10,
        explanation:
          "Correct! The croissant originated in Austria as the kipferl and was later popularized in France.",
      },
      {
        text: "France",
        points: 3,
        explanation:
          "Partially correct. France popularized the croissant, but it originally came from Austria.",
      },
      {
        text: "Belgium",
        points: 0,
        explanation:
          "Incorrect. The croissant is not a traditional Belgian pastry.",
      },
      {
        text: "Italy",
        points: 0,
        explanation:
          "Incorrect. Italy has many iconic pastries, but the croissant is not one of them.",
      },
    ],
  },
  {
    question:
      "Why is psychological safety important in engineering teams? (This question is based on concepts from 'The Pragmatic Engineer'.)",
    options: [
      {
        text: "It ensures that team members avoid conflicts by aligning with the majority's opinions.",
        points: 0,
        explanation:
          "Incorrect. Psychological safety promotes healthy disagreement and debate, not conformity.",
      },
      {
        text: "It enables managers to monitor and address performance issues without team resistance.",
        points: 3,
        explanation:
          "Partially correct. While psychological safety may help address issues, its primary focus is on fostering trust and open communication.",
      },
      {
        text: "It creates an environment where team members feel comfortable sharing ideas, even if they challenge the status quo.",
        points: 10,
        explanation:
          "Correct! Psychological safety encourages openness and innovation by allowing team members to voice ideas without fear.",
      },
      {
        text: "It helps teams prioritize perfectionism to avoid errors during projects.",
        points: 0,
        explanation:
          "Incorrect. Psychological safety supports learning from mistakes rather than avoiding them entirely.",
      },
    ],
  },
  {
    question:
      "How can .NET Core improve performance in a microservices architecture?",
    options: [
      {
        text: "By centralizing all services into a monolithic design",
        points: 0,
        explanation:
          "Incorrect. Monolithic designs reduce the advantages of microservices.",
      },
      {
        text: "By enabling lightweight and platform-independent execution",
        points: 10,
        explanation:
          "Correct! .NET Core is optimized for performance and cross-platform deployment.",
      },
      {
        text: "By using synchronous communication exclusively",
        points: 3,
        explanation:
          "Not ideal. Synchronous communication can lead to performance bottlenecks.",
      },
      {
        text: "By running only on Windows servers for better stability",
        points: 0,
        explanation:
          "Incorrect. .NET Core is platform-independent, making it versatile for microservices.",
      },
    ],
  },
  {
    question: "What is the purpose of Dependency Injection in .NET Core?",
    options: [
      {
        text: "To improve code maintainability and flexibility",
        points: 10,
        explanation:
          "Correct! Dependency Injection promotes loose coupling and easier testing.",
      },
      {
        text: "To reduce application size by removing unused libraries",
        points: 0,
        explanation:
          "Incorrect. Dependency Injection is not related to application size.",
      },
      {
        text: "To automatically deploy the application to the server",
        points: 3,
        explanation:
          "Not ideal. Dependency Injection has no role in deployment.",
      },
      {
        text: "To establish a direct link between components for faster communication",
        points: 0,
        explanation:
          "Incorrect. Dependency Injection decouples components rather than linking them directly.",
      },
    ],
  },
  {
    question:
      "A farmer has 17 sheep. All but 9 run away. How many sheep are left?",
    options: [
      {
        text: "9",
        points: 10,
        explanation: "Correct! 'All but 9' means 9 sheep remain on the farm.",
      },
      {
        text: "8",
        points: 0,
        explanation: "Incorrect. Double-check the wording of the problem.",
      },
      {
        text: "0",
        points: 0,
        explanation: "Incorrect. Not all sheep ran away; 9 are left.",
      },
      {
        text: "17",
        points: 0,
        explanation: "Incorrect. Some sheep ran away, leaving only 9.",
      },
    ],
  },
  {
    question: "What is the purpose of a 'foreign key' in relational databases?",
    options: [
      {
        text: "To ensure all values in a column are unique.",
        points: 0,
        explanation:
          "Incorrect. Unique constraints or primary keys enforce uniqueness, not foreign keys.",
      },
      {
        text: "To improve database query performance by indexing columns.",
        points: 3,
        explanation:
          "Partially correct. While indexing can improve performance, it's not the purpose of a foreign key.",
      },
      {
        text: "To allow users to access sensitive data securely.",
        points: 0,
        explanation:
          "Incorrect. Foreign keys are about data relationships, not access control.",
      },
      {
        text: "To establish a relationship between two tables.",
        points: 10,
        explanation:
          "Correct! Foreign keys create links between related tables in a database.",
      },
    ],
  },
  {
    question: "How can you manage configurations in a .NET Core application?",
    options: [
      {
        text: "Use appsettings.json with environment-specific overrides",
        points: 10,
        explanation:
          "Correct! appsettings.json supports environment-specific configurations.",
      },
      {
        text: "Hardcode values directly into the application",
        points: 0,
        explanation:
          "Incorrect. Hardcoding configuration values is not a best practice.",
      },
      {
        text: "Rely only on command-line arguments for configurations",
        points: 0,
        explanation:
          "Incorrect. While command-line arguments can be helpful, they should complement other configuration methods.",
      },
      {
        text: "Store configurations in plaintext files without encryption",
        points: 3,
        explanation:
          "Not ideal. Plaintext files should be avoided for sensitive configurations.",
      },
    ],
  },
];
