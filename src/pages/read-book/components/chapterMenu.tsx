import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from '@/components/common/Tabs';
import BookmarkMenu from './bookmarkMenu';
import NoteMenu from './noteMenu';
import { observer } from 'mobx-react-lite';

interface ChapterMenuProps {
    onJumpToHighlightArea?: (area: any) => void
}

const ChapterMenu: React.FC<ChapterMenuProps> = ({ onJumpToHighlightArea }) => {
    const tabsValues = {
        bookmark: 'Đánh dấu',
        note: 'Ghi chú'
    };

    return (
        <div className='p-4'>
            <h2 className='text-lg font-semibold mb-4'>Danh sách</h2>
            <div className='flex w-full max-w-sm flex-col gap-6'>
                <Tabs defaultValue={tabsValues.bookmark}>
                    <TabsList className='w-full bg-transparent text-[#ccc] border-b-[1px] border-b-gray-700 rounded-none'>
                        <TabsTrigger className='w-1/2' value={tabsValues.bookmark}>Đánh dấu</TabsTrigger>
                        <TabsTrigger className='w-1/2' value={tabsValues.note}>Ghi chú</TabsTrigger>
                    </TabsList>
                    <TabsContent value={tabsValues.bookmark}>
                        <BookmarkMenu onJumpToPage={onJumpToHighlightArea} />
                    </TabsContent>
                    <TabsContent value={tabsValues.note}>
                        <NoteMenu onJumpToHighlightArea={onJumpToHighlightArea} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default observer(ChapterMenu);
