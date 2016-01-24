# Q2PRO Admin API

All entry points are third level headings relative to API base URL.

Requests must at least have a `method` defined, sessionId is required for all other operations than logging in.

    {
        method: string,
        sessionId: string/null
    }

Responses always have the base structure of:

    {
        error: string/null,
        data: object/null
    }

Where `data` contains the full response object from the backend. All error messages by definition are user friendly and can be displayed as received.

Datetime format is `YYYY-MM-DD HH:MM:SS` and all times are in UTC.

## Session

User session management.

### Login

Request:

    {
        method: 'login',
        username: string,
        password: string,
    }

Response:

    {
        error: string/null,
        data: {
            sessionId: string,
            superUser: bool
        }
    }

### Logout

Request:

    {
        method: 'logout'
    }

Response is empty.

## User

Manage users and access levels. These are only available for users with `superUser` flag on.

### User list

Request:

    {
        method: 'userList'
    }

Response:

    {
        error: string/null,
        data: [
            {
                id: int,
                superUser: bool,
                username: string,
            },
            ...
        ]
    }

### User add

Request:

    {
        method: 'userAdd',
        superUser: bool,
        username: string,
        password: string
    }

Response is empty.

### User edit

Request:

    {
        method: 'userEdit',
        id: int,
        superUser: bool,
        username: string,
        password: string/null
    }

Response is empty.

### User delete

Request:

    {
        method: 'userDelete',
        id: int
    }

Response is empty.

## Server

Manages server list and server configurations like rcon password. Server host is in format `host/ip:port`, for example `127.0.0.1:29710`.

### Server list

Request:

    {
        method: 'serverList'
    }

Response:

    {
        error: string/null,
        data: [
            {
                id: int,
                host: string,
                name: string,
                uptime: string
            },
            ...
        ]
    }

### Server add

Request:

    {
        method: 'serverAdd',
        sessionId: string,
        name: string,
        host: string,
        rcon: string
    }

Response is empty.

### Server edit

Request:

    {
        method: 'serverEdit',
        sessionId: string,
        id: int,
        name: string,
        host: string,
        rcon: string
    }

Response is empty.

### Server delete

Request:

    {
        method: 'serverDelete',
        sessionId: string,
        id: int
    }

Response is empty.

## Rcon

Raw remote rcon. Response has the reply from the command or null with error string set in case of error.

Request:

    {
        method: 'rcon',
        sessionId: string,
        serverId: int,
        command: string
    }

Response:

    {
        error: string/null,
        data: string/null
    }

## Ban management

Handles bans with a possible expiration date.

### Ban list

Request:

    {
        method: 'banList',
        sessionId: string
    }

Response:

    {
        error: string/null,
        data: [
            {
                id: int,
                cidr: string,
                nick: string,
                reason: string,
                expires: datetime/null,
                added: datetime,
                username: string
            },
            ...
        ]
    }

### Ban add

Request:

    {
        method: 'banAdd',
        cidr: string,
        nick: string,
        reason: string,
        expires: datetime/null
    }

Response is empty.

### Ban delete

Request:

    {
        method: 'banDelete',
        id: int
    }

Response is empty.

## Log

User action log. These are only available for users with `superUser` flag on.

### View

Request:

    {
        method: 'logView',
        limit: int,
        offset: int
    }

Response:

    {
        error: string/null,
        data: [
            {
                value: string,
                added: datetime,
                username: string
            }
        ]
