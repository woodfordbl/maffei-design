import { createFileRoute } from "@tanstack/react-router";
import { NotFound } from "@/components/404";

export const Route = createFileRoute("/$")({
	component: RouteComponent,
});

function RouteComponent() {
	return <NotFound />;
}
