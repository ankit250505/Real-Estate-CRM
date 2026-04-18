import { X } from "lucide-react";
import { useNotifications } from "../features/notifications/api";
import { LoadingState } from "../components/state";

export function NotificationsDrawer({ onClose }: { onClose: () => void }) {
  const { data, isLoading } = useNotifications();

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/30">
      <div className="ml-auto h-full w-full max-w-md bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <button onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-6 space-y-3">
          {isLoading ? (
            <LoadingState label="Loading notifications..." />
          ) : (
            data?.map((notification: any) => (
              <div key={notification.id} className="rounded-2xl border border-slate-100 p-4">
                <p className="font-medium">{notification.title}</p>
                <p className="mt-1 text-sm text-slate-500">{notification.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
