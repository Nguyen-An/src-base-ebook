import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hooks/useStore';
import { CircleChevronRightIcon } from 'lucide-react';

interface BookmarkMenuProps {
    onJumpToPage?: (area: any) => void
}

const BookmarkMenu: React.FC<BookmarkMenuProps> = ({ onJumpToPage }) => {
    const {
        readBookStore: { bookmarks, removeBookmark }
    } = useStore();

    if (!bookmarks || bookmarks.length === 0) {
        return <div className='p-4 text-sm text-center text-muted-foreground'>There is no bookmark</div>;
    }

    return (
        <div className='p-2 overflow-auto h-full'>
            {bookmarks.map(b => (
                <div
                    key={b.id}
                    className='border-b border-neutral-800 p-3 cursor-pointer hover:bg-neutral-900'
                    onClick={() => {
                        if (onJumpToPage) {
                            onJumpToPage({
                                height: 0,
                                left: 0,
                                top: 0,
                                pageIndex: b.pageIndex
                            });
                        }
                    }}
                >
                    <div className='font-medium text-sm mb-1'>{b.title}</div>
                    <div className='text-xs text-neutral-400'>{b.createAt}</div>

                    <div className='flex items-center justify-end mt-2 gap-2'>
                        <button
                            className='text-xs text-red-400 hover:underline'
                            onClick={(e) => {
                                e.stopPropagation();
                                removeBookmark(b.id);
                            }}
                        >
                            Xoá
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default observer(BookmarkMenu);
