const { execSync } = require('child_process');
const fs = require('fs');

// Function to check if variable names meet the criteria
function checkVariableNames(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const variableRegex = /\b([a-zA-Z]\w{4,})\b/g; // Regex for variable names with at least 5 characters
    const invalidVariables = new Set();

    let match;
    while ((match = variableRegex.exec(fileContent)) !== null) {
        const variableName = match[1];
        if (variableName.length < 5) {
            invalidVariables.add(variableName);
        }
    }

    return invalidVariables;
}

// Function to run the pipeline
function runPipeline() {
    console.log("Running pipeline...");

    // Example: Clone repository
    execSync("https://github.com/suchigayatri/Devops-Challenge.git");

    // Example: Run checks on all JavaScript files
    const files = fs.readdirSync('./repository');
    files.forEach(file => {
        if (file.endsWith('.js')) {
            const invalidVariables = checkVariableNames(`./repository/${file}`);
            if (invalidVariables.size > 0) {
                console.error(`Invalid variable names found in ${file}: ${[...invalidVariables].join(', ')}`);
                process.exit(1); // Exit with error code
            }
        }
    });

    // Example: Commit changes
    execSync("git add .");
    execSync("git commit -m 'Pipeline passed'");
    execSync("git push origin master");

    console.log("Pipeline completed successfully.");
}

runPipeline();
