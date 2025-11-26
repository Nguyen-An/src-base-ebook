import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hooks/useStore';
import { CircleChevronRightIcon } from 'lucide-react';
import { toJS } from 'mobx';

interface NoteMenuProps {
    onJumpToHighlightArea?: (area: any) => void
}

const NoteMenu: React.FC<NoteMenuProps> = ({ onJumpToHighlightArea }) => {
    const {
        readBookStore: { notes, removeNote }
    } = useStore();

    if (!notes.length) {
        return <div className='p-4 text-sm text-center text-muted-foreground'>There is no note</div>;
    }

    return (
        <div className='p-2 overflow-auto h-full'>
            {notes.map(note => (
                <div
                    key={note.id}
                    className='border-b border-neutral-800 p-3 cursor-pointer hover:bg-neutral-900'
                    onClick={() => {
                        const area = note.highlightAreas?.[0];
                        if (area && onJumpToHighlightArea) {
                            onJumpToHighlightArea({
                                ...area,
                                height: 0,
                                left: 0,
                                top: 0,
                                pageIndex: area.pageIndex
                            });
                        }
                    }}
                >
                    <blockquote className='pl-2 border-l-2 border-neutral-700 text-sm mb-1'>
                        {note.quote}
                    </blockquote>
                    <div className='text-xs text-neutral-300'>{note.content}</div>

                    <div className='flex items-center justify-between mt-2 gap-2'>
                        <div>{note.createAt}</div>
                        <button
                            className='text-xs text-red-400 hover:underline'
                            onClick={(e) => {
                                e.stopPropagation();
                                removeNote(note.id);
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

export default observer(NoteMenu);
