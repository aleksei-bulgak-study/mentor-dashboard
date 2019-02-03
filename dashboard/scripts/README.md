## Metor Dashboard task

### Script for parsing data from provided xlsx files

### Project structure:
* config - folder with json configuration. Config files contains path to files that need to be parsed.
* docs - folder with xlsx files
* errors - folder with files that contains errors related to mapping
  * failed-mentors.json - errors related to matching metor-student pairs.
  * not-mapped-students.json - errors related to matching students tasks results and metors.
* results - file with resulted json
* src - source code
* src/constants.js - some hardcoded paths

## Steps to parse files and get json
1. Add files to `docs` folder. Note that files names should match names specified in `config/config.json` file.
2. Run `npm build` command.
3. Check terminal output and `errors` folder for failed mappings.
4. Check results folder for result mapping.
