import { useNotification } from '../context/NotificationContext';

function NotificationPanel() {
  const { notifications, markRead } = useNotification();
  return (
    <div className="card shadow-sm">
      <div className="card-header">Notifications</div>
      <div className="list-group list-group-flush">
        {notifications.slice(0, 8).map((n) => (
          <button key={n.id} onClick={() => markRead(n.id)} className="list-group-item list-group-item-action text-start">
            <span className={`badge me-2 bg-${n.read ? 'secondary' : 'primary'}`}>{n.read ? 'Read' : 'New'}</span>{n.message}
          </button>
        ))}
        {!notifications.length && <div className="p-3 text-muted">No notifications yet.</div>}
      </div>
    </div>
  );
}

export default NotificationPanel;
