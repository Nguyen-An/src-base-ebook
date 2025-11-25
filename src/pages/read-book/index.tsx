import React, { useState } from 'react';
import { Worker, Viewer, Tooltip, Button, Position, PrimaryButton, Icon, MinimalButton, SpecialZoomLevel, ViewMode, ScrollMode } from '@react-pdf-viewer/core';
import { HighlightArea, highlightPlugin, MessageIcon, RenderHighlightContentProps, RenderHighlightsProps, RenderHighlightTargetProps } from '@react-pdf-viewer/highlight';
import { searchPlugin, SearchPluginProps, RenderSearchProps, NextIcon, PreviousIcon, SearchIcon, RenderShowSearchPopoverProps, SearchPlugin } from '@react-pdf-viewer/search';
import { pageNavigationPlugin, RenderCurrentPageLabelProps, RenderGoToPageProps } from '@react-pdf-viewer/page-navigation';
import { Menu } from 'lucide-react';
// import { Button } from '@/components/ui/button'; // nếu bạn đã có shadcn components
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/search/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
import { BookmarkPlusIcon, ChevronLeftIcon, CircleChevronLeftIcon, CircleChevronRightIcon, SquareMenuIcon } from 'lucide-react';
import '@/pages/read-book/index.scss';
import { useStore } from '@/hooks/useStore';
import ChapterMenu from './components/chapterMenu';
import { SearchSidebarInner } from './SearchSidebarInner';
interface SearchSidebarProps {
    isDocumentLoaded: boolean,
    searchPluginInstance: SearchPlugin
}
interface Note {
    id: number,
    content: string,
    highlightAreas: HighlightArea[],
    quote: string
}

export default function ReadBook() {
    const { modalStore: { showModal } } = useStore();

    const [message, setMessage] = React.useState('');
    const [notes, setNotes] = React.useState<Note[]>([]);

    let noteId = notes.length;

    const noteEles = React.useRef<Map<number, HTMLElement>>(new Map());

    const renderHighlightTarget = (props: RenderHighlightTargetProps) => (
        <div
            style={{
                background: '#eee',
                display: 'flex',
                position: 'absolute',
                left: `${props.selectionRegion.left}%`,
                top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
                transform: 'translate(0, 8px)',
                zIndex: 1
            }}
        >
            <Tooltip
                position={Position.TopCenter}
                target={(
                    <Button onClick={props.toggle}>
                        <MessageIcon />
                    </Button>
                )}
                content={() => <div style={{ width: '100px' }}>Add a note</div>}
                offset={{ left: 0, top: -8 }}
            />
        </div>
    );

    const renderHighlightContent = (props: RenderHighlightContentProps) => {
        const addNote = () => {
            if (message !== '') {
                const note: Note = {
                    id: ++noteId,
                    content: message,
                    highlightAreas: props.highlightAreas,
                    quote: props.selectedText
                };
                setNotes(notes.concat([note]));
                props.cancel();
            }
        };

        return (
            <div
                style={{
                    background: '#fff',
                    border: '1px solid rgba(0, 0, 0, .3)',
                    borderRadius: '2px',
                    padding: '8px',
                    position: 'absolute',
                    left: `${props.selectionRegion.left}%`,
                    top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
                    zIndex: 1
                }}
            >
                <div>
                    <textarea
                        rows={3}
                        style={{
                            border: '1px solid rgba(0, 0, 0, .3)'
                        }}
                        onChange={e => setMessage(e.target.value)}
                    >
                    </textarea>
                </div>
                <div
                    style={{
                        display: 'flex',
                        marginTop: '8px'
                    }}
                >
                    <div style={{ marginRight: '8px' }}>
                        <PrimaryButton onClick={addNote}>Add</PrimaryButton>
                    </div>
                    <Button onClick={props.cancel}>Cancel</Button>
                </div>
            </div>
        );
    };

    const jumpToNote = (note: Note) => {
        const el = noteEles.current.get(note.id);
        if (el) {
            el.scrollIntoView();
        }
    };

    const renderHighlights = (props: RenderHighlightsProps) => (
        <div>
            {notes.map(note => (
                <React.Fragment key={note.id}>
                    {note.highlightAreas
                        .filter(area => area.pageIndex === props.pageIndex)
                        .map((area, idx) => (
                            <div
                                key={idx}
                                style={Object.assign(
                                    {},
                                    {
                                        background: 'yellow',
                                        opacity: 0.4
                                    },
                                    props.getCssProperties(area, props.rotation)
                                )}
                                onClick={() => jumpToNote(note)}
                                ref={(ref): void => {
                                    if (ref) {
                                        noteEles.current.set(note.id, ref as HTMLElement);
                                    } else {
                                        noteEles.current.delete(note.id);
                                    }
                                }}
                            />
                        ))}
                </React.Fragment>
            ))}
        </div>
    );

    const highlightPluginInstance = highlightPlugin({
        renderHighlightTarget,
        renderHighlightContent,
        renderHighlights
    });

    // search plugin
    const searchPluginInstance = searchPlugin();
    const { Search, ShowSearchPopover } = searchPluginInstance;

    const { jumpToHighlightArea } = highlightPluginInstance;

    const pageNavigationPluginInstance = pageNavigationPlugin();
    const { GoToFirstPage, GoToLastPage, GoToNextPage, GoToPreviousPage, CurrentPageLabel } = pageNavigationPluginInstance;

    return (
        <>
            <div className='fixed inset-0 bg-[#000] z-50'>
                <div className='h-[56px] bg-[#29292b] flex justify-between'>
                    <div className='h-[56px] flex items-center'>
                        <ChevronLeftIcon className='ml-4 h-[24px] w-[24px] text-[#fff] cursor-pointer' />
                        {/* Search box */}
                        <div className='w-[250px]'>
                            <Search>
                                {(renderSearchProps: RenderSearchProps) => (
                                    <SearchSidebarInner isDocumentLoaded={true} renderSearchProps={renderSearchProps} />
                                )}
                            </Search>
                        </div>

                    </div>
                    <div>
                        <div className='text-[20px] text-[#fff] text-center'>Nghe thấy tiếng lòng anh</div>
                        <div className='text-[14px] text-[#d8d8d8] text-center'>Chương 3</div>

                    </div>
                    <div className='h-[56px] flex items-center'>
                        <Sheet>
                            <SheetTrigger asChild>
                                <SquareMenuIcon className='mx-3 h-[30px] w-[30px] text-[#fff] cursor-pointer' />
                            </SheetTrigger>

                            <SheetContent side='right' className='w-80 bg-[#29292b] text-white p-0 h-[calc(100vh-0px)] border-0'>
                                <ScrollArea className='b-0'>
                                    <ChapterMenu />
                                </ScrollArea>
                            </SheetContent>
                        </Sheet>
                        <BookmarkPlusIcon className='mx-3 h-[30px] w-[30px] text-[#fff]' />
                    </div>
                </div>
                <div className='h-[calc(100vh-120px)]'>
                    {/* <div className='border border-black/30 flex h-full overflow-hidden'> */}
                    {/* Note box */}
                    {/* <div
                            style={{
                                borderRight: '1px solid rgba(0, 0, 0, 0.3)',
                                width: '25%',
                                overflow: 'auto'
                            }}
                        >
                            {notes.length === 0 && <div style={{ textAlign: 'center' }}>There is no note</div>}
                            {notes.map((note) => {
                                return (
                                    <div
                                        key={note.id}
                                        style={{
                                            borderBottom: '1px solid rgba(0, 0, 0, .3)',
                                            cursor: 'pointer',
                                            padding: '8px'
                                        }}
                                        // Jump to the associated highlight area
                                        onClick={() => jumpToHighlightArea({
                                            ...note.highlightAreas[0],
                                            height: 0,
                                            left: 0,
                                            top: 0,
                                            pageIndex: note.highlightAreas[0].pageIndex - 1
                                        })}
                                    >
                                        <blockquote
                                            style={{
                                                borderLeft: '2px solid rgba(0, 0, 0, 0.2)',
                                                fontSize: '.75rem',
                                                lineHeight: 1.5,
                                                margin: '0 0 8px 0',
                                                paddingLeft: '8px',
                                                textAlign: 'justify'
                                            }}
                                        >
                                            {note.quote}
                                        </blockquote>
                                        {note.content}
                                    </div>
                                );
                            })}
                        </div> */}
                    <div className='flex justify-between'>
                        <div className='flex items-center'>
                            <GoToPreviousPage>
                                {(props: RenderGoToPageProps) => (
                                    <button className={`${props.isDisabled ? 'cursor-not-allowed' : 'pointer'}`} disabled={props.isDisabled} onClick={props.onClick}>
                                        <CircleChevronLeftIcon className={`mx-3 h-[50px] w-[50px] ${props.isDisabled ? 'text-[#ccc]' : 'text-[#fff]'}`} />
                                    </button>
                                )}
                            </GoToPreviousPage>
                        </div>
                        <div className='flex w-[466px] h-[calc(100vh-120px)] overflow-hidden bg-black'>
                            <div className='flex-1 overflow-auto m-[-8px]'>
                                <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
                                    <Viewer
                                        fileUrl={require('../../assets/pdf/20193974_NguyenVanAn_20241.pdf')}
                                        plugins={[highlightPluginInstance, searchPluginInstance, pageNavigationPluginInstance]}
                                        viewMode={ViewMode.SinglePage}
                                        defaultScale={SpecialZoomLevel.PageFit}
                                        scrollMode={ScrollMode.Page}
                                        enableSmoothScroll={false}
                                        theme='dark'
                                    />
                                </Worker>
                            </div>
                            {/* </div> */}
                        </div>
                        <div className='flex items-center'>
                            <GoToNextPage>
                                {(props: RenderGoToPageProps) => (
                                    <button className={`${props.isDisabled ? 'cursor-not-allowed' : 'pointer'}`} disabled={props.isDisabled} onClick={props.onClick}>
                                        <CircleChevronRightIcon className={`mx-3 h-[50px] w-[50px] ${props.isDisabled ? 'text-[#ccc]' : 'text-[#fff]'}`} />
                                    </button>
                                )}
                            </GoToNextPage>
                        </div>
                    </div>
                    <div
                        style={{
                            flex: 1,
                            overflow: 'hidden'
                        }}
                    >
                        <CurrentPageLabel>
                            {(props: RenderCurrentPageLabelProps) => (
                                <span>{`${props.currentPage + 1} of ${props.numberOfPages}`}</span>
                            )}
                        </CurrentPageLabel>
                    </div>
                </div>
                <div className='h-[56px] bg-[#29292b]'></div>
            </div>
        </>

    );
}
