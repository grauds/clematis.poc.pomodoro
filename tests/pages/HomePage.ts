import { AbstractPage } from './AbstractPage';

export class HomePage extends AbstractPage {

  private static HOME_PAGE_XPATH = {
    newTaskNameInput: "input[name='']"
  }

  async enterTaskName(taskName: string) {
    await this.enterText(HomePage.HOME_PAGE_XPATH.newTaskNameInput, taskName);
  }

}