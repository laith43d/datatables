import type { TableHandlerInterface } from './';
declare class __sveltets_Render<T extends Row> {
    props(): {
        table: TableHandlerInterface<T>;
    };
    events(): {};
    slots(): {};
    bindings(): "";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <T extends Row>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<T>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<T>['props']>, ReturnType<__sveltets_Render<T>['events']>, ReturnType<__sveltets_Render<T>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<T>['bindings']>;
    } & ReturnType<__sveltets_Render<T>['exports']>;
    <T extends Row>(internal: unknown, props: ReturnType<__sveltets_Render<T>['props']> & {}): ReturnType<__sveltets_Render<T>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any>['bindings']>;
}
declare const Pagination: $$IsomorphicComponent;
type Pagination<T extends Row> = InstanceType<typeof Pagination<T>>;
export default Pagination;