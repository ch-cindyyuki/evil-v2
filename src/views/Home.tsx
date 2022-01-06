import { Component, Vue, Inject } from "packages";
import { Test } from "@/utils/test";

@Component()
export default class Home extends Vue {
  constructor(
    @Inject(Test)
    private test: Test
  ) {
    super();
    console.log(111, test);
  }

  render() {
    return (
      <div>111</div>
    );
  }
}