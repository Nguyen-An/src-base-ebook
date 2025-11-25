import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from '@/components/common/Tabs';
import SearchMenu from './searchMenu';
import BookmarkMenu from './bookmarkMenu';
import NoteMenu from './noteMenu';

export default function ChapterMenu() {
    const tabsValues = {
        search: 'Tìm kiếm',
        bookmark: 'Đánh dấu',
        note: 'Ghi chú'
    };

    return (
        <div className='p-4'>
            <h2 className='text-lg font-semibold mb-4'>Danh sách</h2>
            <div className='flex w-full max-w-sm flex-col gap-6'>
                <Tabs defaultValue={tabsValues.search}>
                    <TabsList className='w-full bg-transparent text-[#ccc] border-b-[1px] border-b-gray-700 rounded-none'>
                        <TabsTrigger className='w-1/3' value={tabsValues.search}>Tìm kiếm</TabsTrigger>
                        <TabsTrigger className='w-1/3' value={tabsValues.bookmark}>Đánh dấu</TabsTrigger>
                        <TabsTrigger className='w-1/3' value={tabsValues.note}>Ghi chú</TabsTrigger>
                    </TabsList>
                    <TabsContent value={tabsValues.search}>
                        <SearchMenu />
                    </TabsContent>
                    <TabsContent value={tabsValues.bookmark}>
                        <BookmarkMenu />
                    </TabsContent>
                    <TabsContent value={tabsValues.note}>
                        <NoteMenu />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
