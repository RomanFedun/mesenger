export enum SocketEvents {
    MESSENGER_JOIN = 'messenger:join',
    MESSENGER_LEAVE = 'messenger:leave',

    USER_CONTACT_CREATE = 'contact:create',
    USER_CONTACT_SUCCESS = 'contact:createSuccess',
    USER_CONTACT_FAILURE = 'contact:createFailure',

    USER_CONTACT_UPDATE = 'contact:update',
    USER_CONTACT_UPDATE_SUCCESS = 'contact:updateSuccess',
    USER_CONTACT_UPDATE_FAILURE = 'contact:updateFailure',
    USER_CONTACT_DELETE = 'contact:delete',
    USER_CONTACT_DELETE_SUCCESS = 'contact:deleteSuccess',
    USER_CONTACT_DELETE_FAILURE = 'contact:deleteFailure'
}
