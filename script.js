function dijkstra(graph, start) {
    const distances = {};
    const visited = new Set();
    const priorityQueue = new PriorityQueue();

    // Initialize distances with infinity, and 0 for the start vertex
    for (let vertex in graph) {
        distances[vertex] = Infinity;
    }
    distances[start] = 0;

    // Add the start vertex to the priority queue
    priorityQueue.enqueue(start, 0);

    while (!priorityQueue.isEmpty()) {
        const { vertex, priority } = priorityQueue.dequeue();

        if (!visited.has(vertex)) {
            visited.add(vertex);

            for (let neighbor in graph[vertex]) {
                const weight = graph[vertex][neighbor];
                const newDistance = distances[vertex] + weight;

                if (newDistance < distances[neighbor]) {
                    distances[neighbor] = newDistance;
                    priorityQueue.enqueue(neighbor, newDistance);
                }
            }
        }
    }

    return distances;
}

// Priority Queue implementation
class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(vertex, priority) {
        this.values.push({ vertex, priority });
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    }

    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }

    isEmpty() {
        return this.values.length === 0;
    }
}

// Example usage
const graph = {
    'A': { 'B': 4, 'C': 2 },
    'B': { 'A': 4, 'C': 5, 'D': 10 },
    'C': { 'A': 2, 'B': 5, 'D': 3 },
    'D': { 'B': 10, 'C': 3 }
};

const shortestPaths = dijkstra(graph, 'A');
console.log(shortestPaths); // { A: 0, B: 4, C: 2, D: 5 }
