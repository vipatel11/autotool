const initState = {
    projects: [
        { id: '1', title: 'Help me find peach', content: 'balh balh balh balh' },
        { id: '2', title: 'collect all the stars', content: 'balh balh balh balh' },
        { id: '3', title: 'egg hunt with yoshi', content: 'balh balh balh balh' }
    ]
}

const projectReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_PROJECT':
            console.log('created project', action.project);
            return state;
        case 'CREATE_PROJECT_ERROR':
            console.log('cretae project error', action.err);
            return state;
        default:
            return state;
    }
}

export default projectReducer