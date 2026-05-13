import React from 'react'
import moment from 'moment'

const Notifications = (props) => {
    const { notifications, projects } = props;
    const projectNotifications = projects && projects.map(project => ({
        id: project.id,
        user: `${project.authorFirstName || 'Someone'} ${project.authorLastName || ''}`.trim(),
        content: 'Added a new project',
        time: project.createdAt
    }));
    const items = notifications && notifications.length ? notifications : projectNotifications;

    return (
        <div className="section">
            <div className="card right">
                <div className="card-content">
                    <span className="card-title">Notifications</span>
                    <ul className="notifications">
                        {items && items.length ? items.map(item => {
                            return (
                                <li key={item.id}>
                                    <span className="pink-text">{item.user} </span>
                                    <span>{item.content}</span>
                                    <div className="grey-text note-date">
                                        {item.time && moment(item.time.toDate()).fromNow()}
                                    </div>
                                </li>
                            )
                        }) : (
                            <li className="grey-text">No notifications yet</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Notifications 
