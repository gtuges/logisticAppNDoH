import React, { memo } from 'react';

interface NotificationSectionProps {
  isPodAttached: boolean;
  isPhoNotified: boolean;
  onPodAttachedChange: (value: boolean) => void;
  onPhoNotifiedChange: (value: boolean) => void;
}

const NotificationSection: React.FC<NotificationSectionProps> = ({
  isPodAttached,
  isPhoNotified,
  onPodAttachedChange,
  onPhoNotifiedChange
}) => {
  return (
    <div className="space-y-3">
      <label className="inline-flex items-center">
        <input
          type="checkbox"
          checked={isPodAttached}
          onChange={(e) => onPodAttachedChange(e.target.checked)}
          className="form-checkbox h-4 w-4 text-blue-600"
        />
        <span className="ml-2">
          <span className="text-sm text-gray-700">PoD Document Attached</span>
          <span className="block text-xs text-gray-500">
            Confirm if the proof of delivery document is attached
          </span>
        </span>
      </label>

      <label className="inline-flex items-center">
        <input
          type="checkbox"
          checked={isPhoNotified}
          onChange={(e) => onPhoNotifiedChange(e.target.checked)}
          className="form-checkbox h-4 w-4 text-blue-600"
        />
        <span className="ml-2">
          <span className="text-sm text-gray-700">
            Provincial Health Office (PHO) Notified
          </span>
          <span className="block text-xs text-gray-500">
            Confirm if the provincial health office has been notified of the delivery
          </span>
        </span>
      </label>
    </div>
  );
};

export default memo(NotificationSection);