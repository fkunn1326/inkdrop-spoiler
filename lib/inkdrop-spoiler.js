'use babel';

const spoiler = require('remark-spoiler');
const { markdownRenderer } = require('inkdrop')

module.exports = {
  activate() {
    this.subscription = inkdrop.commands.add(document.body, {
      'inkdrop-spoiler:toggle-spoiler': ()=> {
        const cm = inkdrop.getActiveEditor().cm;

        if(/\|\|\S+|\|\|/.test(cm.getSelection())){
          const replaced = cm.getSelection().replaceAll("||","")
          cm.replaceSelection(replaced);
        }else{
          cm.replaceSelection(`||${cm.getSelection()}||`);
          const {line, ch} = cm.getCursor();
          cm.setCursor({line, ch: ch - 2});
        }
      }
    });

    return markdownRenderer.remarkPlugins.push(spoiler);
  },

  deactivate() {	  
    this.subscription.dispose();
	
    if (markdownRenderer) {
      markdownRenderer.remarkPlugins = markdownRenderer.remarkPlugins.filter(
        plugin => {
          return plugin !== spoiler
        }
      )
    }
  }
};