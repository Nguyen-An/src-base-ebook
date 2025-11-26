import { action, flow, makeObservable, observable } from 'mobx';
import RootStore from '.';
import BaseStore from './BaseStore';
import { HighlightArea } from '@react-pdf-viewer/highlight';

export interface NoteItem {
    id: number,
    content: string,
    highlightAreas: HighlightArea[],
    quote: string,
    createAt: string
}

export interface BookmarkItem {
    id: number,
    pageIndex: number,
    title: string,
    createAt: string
}

export default class ReadBookStore extends BaseStore {
    notes: NoteItem[] = [];
    bookmarks: BookmarkItem[] = [];

    constructor(rootStore: RootStore) {
        super(rootStore);
        makeObservable(this, {
            notes: observable,
            bookmarks: observable,
            setNotes: action.bound,
            addNote: action.bound,
            removeNote: action.bound,
            updateNote: action.bound,
            setBookmarks: action.bound,
            addBookmark: action.bound,
            removeBookmark: action.bound,
            clearNotes: action.bound
        });
    }

    setBookmarks(b: BookmarkItem[]) {
        this.bookmarks = b;
    }

    addBookmark(b: BookmarkItem) {
        if (!this.bookmarks.find(x => x.pageIndex === b.pageIndex)) {
            this.bookmarks = [...this.bookmarks, b];
        }
    }

    removeBookmark(id: number) {
        this.bookmarks = this.bookmarks.filter(x => x.id !== id);
    }

    setNotes(notes: NoteItem[]) {
        this.notes = notes;
    }

    addNote(note: NoteItem) {
        this.notes = [...this.notes, note];
    }

    removeNote(id: number) {
        this.notes = this.notes.filter(n => n.id !== id);
    }

    updateNote(id: number, patch: Partial<NoteItem>) {
        this.notes = this.notes.map(n => (n.id === id ? { ...n, ...patch } : n));
    }

    clearNotes() {
        this.notes = [];
    }
}
