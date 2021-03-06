'use babel';

import WhitespaceLeaderView from './whitespace-leader-view';
import { CompositeDisposable } from 'atom';

export default {

  whitespaceLeaderView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.whitespaceLeaderView = new WhitespaceLeaderView(state.whitespaceLeaderViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.whitespaceLeaderView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'whitespace-leader:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.whitespaceLeaderView.destroy();
  },

  serialize() {
    return {
      whitespaceLeaderViewState: this.whitespaceLeaderView.serialize()
    };
  },

  toggle() {
    let editor;
    if (editor === atom.workspace.getActiveTextEditor()) {
      let scrollOffset = [10, 0];
      let cursorPosition = editor.setCursorScreenPosition(scrollOffset);
      return cursorPosition;
    }
  }

};
