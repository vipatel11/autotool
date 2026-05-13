export const createProject = (project) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {

        //make Async Call to Database
        const firestore = getFirestore();
        const { auth, profile } = getState().firebase;
        const displayName = auth.displayName || auth.email || 'Unknown User';
        const nameParts = displayName.split(' ');
        const authorFirstName = profile.firstName || nameParts[0] || 'Unknown';
        const authorLastName = profile.lastName || nameParts.slice(1).join(' ') || '';
        const authorId = auth.uid;

        const notification = {
            content: 'Added a new project',
            user: `${authorFirstName} ${authorLastName}`.trim(),
            time: new Date()
        };

        return firestore.collection('projects').add({
            ...project,
            authorFirstName,
            authorLastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(() => {
            return firestore.collection('notifications').add(notification);
        }).then(() => {
            dispatch({ type: 'CREATE_PROJECT', project });
        }).catch((err) => {
            dispatch({ type: 'CREATE_PROJECT_ERROR', err });
        })

    }
};
