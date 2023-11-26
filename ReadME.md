# Cuarto Banking App

This project is established as part of my CS165-L course project. This readme aims to ingratiate the user about using this app.

## Steps:

1. Clone this project by running the command ``git clone https://github.com/buttafraz22/seproject`` anywhere inside your command line.
2. Next up, you should see two folders, ``api/`` and ``frontend/`` inside, along with the ``.gitignore`` and ``ReadME.md`` file.
3. Run the ``npm i`` command inside both   ``api/`` and ``frontend/ ``  folders.
4. When you are done, run the ``npm run start`` command inside the ``frontend/`` directory. This will start the development server.
5. Similarly, run the command ``npm run dev`` inside the ``api/`` directory.

## Running the App

Run the backend `api/`.

Open up postman. On the URL bar, type ``localhost:3005/user``. Send a post request at this URL with the body 

```json
{
	"userName" : "<your username>",
	"password" : "<your password>",
	"role" : "admin"
}
```

to setup the admin for the app. Use these credentials to login for the admin portal on the frontend.

Then make accounts for the users in the `Accounts Management` tab and use them for userside experience. 