import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface PublishConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isPublished: boolean;
}

export const PublishConfirmModal = ({ open, onClose, onConfirm, isPublished }: PublishConfirmModalProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isPublished ? 'Update Published Resource' : 'Publish Resource'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isPublished 
              ? 'Are you sure you want to update this published resource? The changes will be visible to all users immediately.'
              : 'Are you sure you want to publish this resource? It will be visible to all users on the website.'
            }
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {isPublished ? 'Update' : 'Publish'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};