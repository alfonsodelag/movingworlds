# MovingWorlds | Test

### Running the project

    - Use 'yarn install' in the terminal to install all the dependencies required for the project to run
    - Use 'node server' to run the backend of the project at 'http://localhost:4000/'
    - Use 'yarn start' to run the frontend of the project at 'http://localhost:3000/'
    - When the project is running in your browser, add a URL in the input

### Requirements:

    - A user can submit a URL and receive a unique shortcode in response.
    - A user can submit a URL and shortcode and will receive the chosen shortcode if it is available.
    - A user can access a /<shortcode> endpoint and be redirected to the URL associated with that shortcode, if it exists.
    - All shortcodes can contain digits, upper case letters, and lowercase letters. It is case sensitive.
    - Automatically allocated shortcodes are exactly 6 characters long.
    - User submitted shortcodes must be at least 4 characters long.
    - A user can access a /<shortcode>/stats endpoint in order to see when the shortcode was registered, when it was last accessed, and how many times it was accessed.

### Output:

    - A README file with setup instructions.
    - Good testing practices.
    - Clean code (of course).
    - A git repository with clean commit history.
    - Good REST practices.

## Authors

    Alfonso De La Guardia
